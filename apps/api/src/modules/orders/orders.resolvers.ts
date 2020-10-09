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
import type { OrderData, ProductData } from '@api/db';
import OrdersService from './orders.service';
import ProductsService from '@api/modules/products/products.service';
import { deepMergeArrayRight, Order, arrayOrder } from '@api/utils';
import { ANONIM_CART_NAME_IN_COOKIE, ERROR_CODE_MESSAGES } from '@api/CONSTANTS';
import UsersService from '@api/modules/users/users.service';
import PubsubService from '@api/modules/pubsub/pubsub.service';
import { OrderStatus } from '@demo/gql-schema';

const SIGN_CONFIG = {
  httpOnly: true,
  expiresIn: 7 * 24 * 60 * 60,
};
const SUBSCRIPTION_NAME = 'cartChanged';

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
  async getUserCart(@Context() { user, anonimOrder, res }) {
    if (!user) {
      const order = (anonimOrder as OrderData) || this.orders.createAnonimOrder();

      this.setAnonimCartResCookie(res, order);

      return order;
    }

    const { orders } = await this.users.whereId(user.sub);

    return this.orders.whereId(orders[0]);
  }

  @Query('orders')
  async ordersQuery(@Context() { user }) {
    if (!user) throw new UnauthorizedException(ERROR_CODE_MESSAGES.NOT_LOGIN);

    const userDB = await this.users.whereId(user.sub);

    return this.orders.whereIds(userDB.orders);
  }

  @ResolveField('products')
  async category(@Parent() order: OrderData, @Context() { user }) {
    const favorites = user ? (await this.users.whereId(user.sub)).favorites : [];
    const products: any = await this.products.whereIds(order.products.map((p) => p.id));

    return deepMergeArrayRight(
      order.products,
      (products as ProductData[]).map((p) => ({ ...p, favorite: favorites.indexOf(p.id) !== -1 }))
    );
  }

  @Mutation('addToCart')
  async addToCart(@Args('productID') productID: string, @Context() { user, anonimOrder, res }) {
    const order =
      (user && (await this.orders.whereId((await this.users.whereId(user.sub)).orders[0]))) ||
      (anonimOrder as OrderData) ||
      this.orders.createAnonimOrder();
    const product = order.products.find((p) => p.id === productID);

    if (product) {
      product.amount++;
    } else {
      const productInDB = await this.products.whereId(productID);

      if (!productInDB) throw new NotFoundException(`Product with id=${productID} not found`);

      order.products.push({
        id: productID,
        amount: 1,
      });
    }

    order.products.sort(arrayOrder(Order.dsc, 'name'));

    const productsInDB = await this.products.whereIds(order.products.map((p) => p.id));

    order.total = order.products.reduce((total, p) => total + p.amount, 0);
    order.price = order.products.reduce(
      (price, p, i) => price + (productsInDB[i] as ProductData).price * p.amount,
      0
    );

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
    @Context() { user, anonimOrder, res }
  ) {
    const order =
      (user && (await this.orders.whereId((await this.users.whereId(user.sub)).orders[0]))) ||
      (anonimOrder as OrderData) ||
      this.orders.createAnonimOrder();
    const product = order.products.find((p) => p.id === productID);
    const productsInDB = await this.products.whereIds(order.products.map((p) => p.id));

    if (product) {
      product.amount = product.amount > 0 ? product.amount - 1 : 0;
    }

    order.total = order.products.reduce((total, p) => total + p.amount, 0);
    order.price = order.products.reduce(
      (price, p, i) => price + (productsInDB[i] as ProductData).price * p.amount,
      0
    );

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
    @Context() { user, anonimOrder, res }
  ) {
    const order =
      (user && (await this.orders.whereId((await this.users.whereId(user.sub)).orders[0]))) ||
      (anonimOrder as OrderData) ||
      this.orders.createAnonimOrder();
    const index = order.products.findIndex((p) => p.id === productID);
    order.products.splice(index, 1);
    const productsInDB = await this.products.whereIds(order.products.map((p) => p.id));

    order.total = order.products.reduce((total, p) => total + p.amount, 0);
    order.price = order.products.reduce(
      (price, p, i) => price + (productsInDB[i] as ProductData).price * p.amount,
      0
    );

    if (!user) {
      this.setAnonimCartResCookie(res, order);
    } else {
      this.pubService.publish(SUBSCRIPTION_NAME, { cartChanged: { order, date: Date.now() } });
    }

    return order;
  }

  @Mutation('fillCart')
  async fillCart(@Context() { user }) {
    if (!user) throw new UnauthorizedException(ERROR_CODE_MESSAGES.NOT_LOGIN);

    const userDB = await this.users.whereId(user.sub);
    const order = await this.orders.whereId(userDB.orders[0]);

    order.status = OrderStatus.FILLED;

    const newOrder = this.orders.createOrder(user);

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
