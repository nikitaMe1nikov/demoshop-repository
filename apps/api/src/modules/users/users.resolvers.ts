import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Context } from '@nestjs/graphql';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserData, OrderData } from '@api/db';
import { TOKEN_NAME_IN_COOKIE, ANONIM_CART_NAME_IN_COOKIE } from '@api/CONSTANTS';
import UsersService from './users.service';
import ProductsService from '@api/modules/products/products.service';
import OrdersService from '@api/modules/orders/orders.service';
import {
  UserSignupInput,
  UserLoginInput,
  UserRole,
  OrderStatus,
  UserInfoInput,
} from '@demo/gql-schema';

const SIGN_CONFIG = {
  httpOnly: true,
};
const ERROR_LOGIN_ERROR = 'incorrect email or password';
const NOT_FOUND_ERROR = 'not found user';
const ANONIM_USER = {
  id: 0,
  email: 'anonim',
  name: 'anonim',
  surname: '',
  roles: [UserRole.ANONIM],
  favorites: [],
};

@Resolver('User')
export default class UsersResolvers {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly products: ProductsService,
    private readonly orders: OrdersService
  ) {}

  @Query('me')
  getReqUser(@Context() { user }) {
    if (!user) return ANONIM_USER;

    return this.users.whereId(user.sub);
  }

  @ResolveField('favorites')
  async favorites(@Context() { user }) {
    if (!user) return [];

    const { favorites } = await this.users.whereId(user.sub);

    const products = await this.products.whereIds(favorites);

    return products.map((p) => ({ ...p, favorite: true }));
  }

  @ResolveField('activeOrders')
  async ordersField(@Context() { user, anonimOrder }) {
    if (!user) return anonimOrder;

    const { orders } = await this.users.whereId(user.sub);
    const ordersDB = await this.orders.whereIds(orders);

    return ordersDB.filter((o) => o.status !== OrderStatus.CREATED).slice(0, 3);
  }

  calcJWTPayload({ name, id, roles }: UserData) {
    return {
      username: name,
      sub: id,
      roles,
    };
  }

  setTokenResCookie(res: Response, user: UserData) {
    res.clearCookie(ANONIM_CART_NAME_IN_COOKIE);
    res.cookie(TOKEN_NAME_IN_COOKIE, this.jwtService.sign(this.calcJWTPayload(user)), SIGN_CONFIG);
  }

  @Mutation('signup')
  async signup(
    @Args('userSignupInput') { email, name, surname, password }: UserSignupInput,
    @Context() { res, anonimOrder }
  ) {
    const user = this.users.whereEmail(email);

    if (user) {
      this.setTokenResCookie(res, user);

      return user;
    }

    const newUser = await this.users.createUser(email, password, name, surname);

    const newOrder = this.orders.createOrder(newUser, anonimOrder);

    newUser.orders.unshift(newOrder.id);

    this.setTokenResCookie(res, newUser);

    return newUser;
  }

  @Mutation('login')
  async login(
    @Args('userLoginInput') { email, password }: UserLoginInput,
    @Context() { res, anonimOrder }
  ) {
    const user = this.users.whereEmail(email);

    if (!user) throw new UnauthorizedException(ERROR_LOGIN_ERROR);

    const isMatch = await bcrypt.compare(password, user.pashash);

    if (!isMatch) throw new UnauthorizedException(ERROR_LOGIN_ERROR);

    const order = await this.orders.whereId(user.orders[0]);

    if (anonimOrder) this.mergeOrder(anonimOrder, order);

    this.setTokenResCookie(res, user);

    return user;
  }

  @Mutation('logout')
  async logout(@Context() { res }) {
    res.clearCookie(TOKEN_NAME_IN_COOKIE);
    res.clearCookie(ANONIM_CART_NAME_IN_COOKIE);

    return true;
  }

  @Mutation('saveProfile')
  async saveProfile(@Args('userInfoInput') { email, name, surname }: UserInfoInput) {
    const user = this.users.whereEmail(email);

    if (!user) throw new NotFoundException(NOT_FOUND_ERROR);

    Object.assign(user, { email, name });

    if (surname) user.surname = surname;

    return user;
  }

  mergeOrder({ products: fromProducts }: OrderData, { products: toProducts }: OrderData) {
    fromProducts.forEach((fromProduct) => {
      const toProduct = toProducts.find((p) => p.id === fromProduct.id);

      if (toProduct) {
        toProduct.amount += fromProduct.amount;
      } else {
        toProducts.push(fromProduct);
      }
    });
  }
}
