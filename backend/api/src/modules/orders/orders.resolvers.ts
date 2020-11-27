import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import type { OrderData, ProductData, ProductInOrder } from '../../db';
import OrdersService from './orders.service';
import ProductsService from '../products/products.service';
import { deepMergeArrayRight, Order, arrayOrder } from '../../utils';
import { ANONIM_CART_NAME_IN_COOKIE, ERROR_CODE_MESSAGES } from '../../CONSTANTS';
import UsersService from '../users/users.service';
import PubsubService from '../pubsub/pubsub.service';
import { OrderStatus } from '../../gql-types';
import type { GQLContext } from '../../GraphqlOptions';

const SIGN_CONFIG = {
  httpOnly: true,
  expiresIn: 7 * 24 * 60 * 60,
};
const SUBSCRIPTION_NAME = 'cartChanged';

function pickFilled(order: OrderData) {
  return order.status === OrderStatus.FILLED;
}

@Resolver('Order')
export default class OrdersResolvers {
  constructor(
    private readonly jwtService: JwtService,
    private readonly orders: OrdersService,
    private readonly products: ProductsService,
    private readonly users: UsersService,
    private readonly pubService: PubsubService
  ) {}

  setAnonimCartResCookie(res: Response, order: OrderData) {
    res.cookie(ANONIM_CART_NAME_IN_COOKIE, this.jwtService.sign(order), SIGN_CONFIG);
  }

  @Query('cart')
  async getUserCart(@Context() { user, anonimOrder, res }: GQLContext) {
    if (!user) {
      const order = (anonimOrder as OrderData) || this.orders.createAnonimOrder();

      this.setAnonimCartResCookie(res, order);

      return order;
    }

    const { orders } = await this.users.whereId(user.sub);

    return this.orders.whereId(orders[0]);
  }

  @Query('orders')
  async ordersQuery(@Context() { user }: GQLContext) {
    if (!user) throw new UnauthorizedException(ERROR_CODE_MESSAGES.NOT_LOGIN);

    const userDB = await this.users.whereId(user.sub);
    const orders = await this.orders.whereIds(userDB.orders);

    return orders.filter(pickFilled);
  }

  @ResolveField('products')
  async category(@Parent() order: OrderData, @Context() { user }: GQLContext) {
    const favorites = user ? (await this.users.whereId(user.sub)).favorites : [];
    const products = await this.products.whereIds(order.products.map((p) => p.id));
    return deepMergeArrayRight(
      order.products,
      products.map((p) => ({ ...p, favorite: favorites.indexOf(p.id) !== -1 }))
    );
  }

  @Mutation('addToCart')
  async addToCart(
    @Args('productID') productID: string,
    @Context() { user, anonimOrder, res }: GQLContext
  ) {
    const order =
      (user && (await this.orders.whereId((await this.users.whereId(user.sub)).orders[0]))) ||
      (anonimOrder as OrderData) ||
      this.orders.createAnonimOrder();
    const product = order.products.find((p: ProductInOrder) => p.id === productID);

    if (product) {
      product.amount++;
    } else {
      const productInDB = await this.products.whereId(productID);

      if (!productInDB) throw new NotFoundException(`Product with id=${productID} not found`);

      order.products.push({
        id: productID,
        amount: 1,
        // total: 0,
      });
    }

    order.products.sort(arrayOrder(Order.dsc, 'name'));

    const productsInDB = await this.products.whereIds(
      order.products.map((p: ProductInOrder) => p.id)
    );

    order.total = order.products.reduce((total: number, p: ProductInOrder) => total + p.amount, 0);
    order.price = order.products.reduce(
      (price: number, p: ProductInOrder, i: number) =>
        price + (productsInDB[i] as ProductData).price * p.amount,
      0
    );
    order.totalByID.push(productID);

    if (!user) {
      this.setAnonimCartResCookie(res, order);
    } else {
      this.pubService.publish(SUBSCRIPTION_NAME, { cartChanged: { order, date: Date.now() } });
    }

    return order;
  }

  @Mutation('removeFromCart')
  async removeFromCart(
    @Args('productID') productID: string,
    @Context() { user, anonimOrder, res }: GQLContext
  ) {
    const order =
      (user && (await this.orders.whereId((await this.users.whereId(user.sub)).orders[0]))) ||
      (anonimOrder as OrderData) ||
      this.orders.createAnonimOrder();
    const product = order.products.find((p: ProductInOrder) => p.id === productID);
    const productsInDB = await this.products.whereIds(
      order.products.map((p: ProductInOrder) => p.id)
    );

    if (product) {
      product.amount = product.amount > 0 ? product.amount - 1 : 0;
    }

    order.total = order.products.reduce((total: number, p: ProductInOrder) => total + p.amount, 0);
    order.price = order.products.reduce(
      (price: number, p: ProductInOrder, i: number) =>
        price + (productsInDB[i] as ProductData).price * p.amount,
      0
    );

    const index = order.totalByID.indexOf(productID);

    if (index !== -1) order.totalByID.splice(index, 1);

    if (!user) {
      this.setAnonimCartResCookie(res, order);
    } else {
      this.pubService.publish(SUBSCRIPTION_NAME, { cartChanged: { order, date: Date.now() } });
    }

    return order;
  }

  @Mutation('deleteFromCart')
  async deleteFromCart(
    @Args('productID') productID: string,
    @Context() { user, anonimOrder, res }: GQLContext
  ) {
    const order =
      (user && (await this.orders.whereId((await this.users.whereId(user.sub)).orders[0]))) ||
      (anonimOrder as OrderData) ||
      this.orders.createAnonimOrder();
    const index = order.products.findIndex((p: ProductInOrder) => p.id === productID);
    order.products.splice(index, 1);
    const productsInDB = await this.products.whereIds(
      order.products.map((p: ProductInOrder) => p.id)
    );

    order.total = order.products.reduce((total: number, p: ProductInOrder) => total + p.amount, 0);
    order.price = order.products.reduce(
      (price: number, p: ProductInOrder, i: number) =>
        price + (productsInDB[i] as ProductData).price * p.amount,
      0
    );

    let indexID = order.totalByID.indexOf(productID);

    do {
      order.totalByID.splice(indexID, 1);

      indexID = order.totalByID.indexOf(productID);
    } while (indexID !== -1);

    if (!user) {
      this.setAnonimCartResCookie(res, order);
    } else {
      this.pubService.publish(SUBSCRIPTION_NAME, { cartChanged: { order, date: Date.now() } });
    }

    return order;
  }

  @Mutation('fillCart')
  async fillCart(@Context() { user }: GQLContext) {
    if (!user) throw new UnauthorizedException(ERROR_CODE_MESSAGES.NOT_LOGIN);

    const userDB = await this.users.whereId(user.sub);
    const order = await this.orders.whereId(userDB.orders[0]);

    order.status = OrderStatus.FILLED;
    order.products = order.products.map(({ id }) => ({ id, amount: 0 }));

    const newOrder = this.orders.createOrder(userDB);

    userDB.orders.unshift(newOrder.id);

    return order;
  }

  @Subscription(SUBSCRIPTION_NAME, {
    filter: (payload, variables) => payload.cartChanged.order.userID === variables.userID,
  })
  cartChanged() {
    return this.pubService.asyncIterator(SUBSCRIPTION_NAME);
  }
}
