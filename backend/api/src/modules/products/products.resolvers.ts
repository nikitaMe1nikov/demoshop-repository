import { HttpException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Order, arrayOrder } from '../../utils';
import { ProductsSort } from '../../gql-types';
import type { ProductData } from '../../db';
import ProductsService from './products.service';
import CategoriesService from '../../modules/categories/categories.service';
import UsersService from '../../modules/users/users.service';
import { ERROR_CODE, ERROR_CODE_MESSAGES } from '../../CONSTANTS';
import type { GQLContext } from '../../GraphqlOptions';

@Resolver('Product')
export default class ProductsResolvers {
  constructor(
    private readonly products: ProductsService,
    private readonly categories: CategoriesService,
    private readonly users: UsersService
  ) {}

  @Query('products')
  async all(
    @Args('categoryID') categoryID: string,
    @Args('sort') sort: ProductsSort,
    @Args('first') first: number,
    @Args('after') after: number,
    @Context() { user }: GQLContext
  ) {
    const favorites = user ? (await this.users.whereId(user.sub)).favorites : [];

    const products = this.products
      .all()
      .filter((p) => p.categoryID === categoryID)
      .sort(arrayOrder(sort === ProductsSort.PriceASC ? Order.asc : Order.dsc, 'price'))
      .map((p) => ({ ...p, favorite: favorites.indexOf(p.id) !== -1 }));
    const nodes = products.slice(after, after + first);

    return {
      nodes: nodes,
      total: products.length,
      endCursor: first + after,
      hasNextPage: first + after < products.length,
    };
  }

  @Query('favorites')
  async favorites(@Context() { user }: GQLContext) {
    if (!user) return [];

    const { favorites } = await this.users.whereId(user.sub);

    const products = await this.products.whereIds(favorites);

    return products.map((p) => ({ ...p, favorite: true }));
  }

  @Query('product')
  async productWhere(@Args('id') id: string, @Context() { user }: GQLContext) {
    const favorites = user ? (await this.users.whereId(user.sub)).favorites : [];
    const product = await this.products.whereId(id);

    return { ...product, favorite: favorites.indexOf(product.id) !== -1 };
  }

  @ResolveField('category')
  async category(@Parent() { categoryID }: ProductData) {
    return this.categories.whereId(categoryID);
  }

  @ResolveField('recomendations')
  async recomendations(@Parent() { recomendations }: ProductData, @Context() { user }: GQLContext) {
    const favorites = user ? (await this.users.whereId(user.sub)).favorites : [];
    const products = await this.products.whereIds(recomendations);

    return products.length
      ? products.map((p) => ({ ...p, favorite: favorites.indexOf(p.id) !== -1 }))
      : [];
  }

  @Mutation('addFavorite')
  async addFavorites(@Args('id') id: string, @Context() { user }: GQLContext) {
    if (!user)
      throw new HttpException(
        ERROR_CODE_MESSAGES.NOT_WORK_FOR_ANONIM,
        ERROR_CODE.NOT_WORK_FOR_ANONIM
      );

    const product = await this.products.whereId(id);

    if (!product)
      throw new HttpException(
        ERROR_CODE_MESSAGES.NOT_FOUND_PRODUCT,
        ERROR_CODE.NOT_WORK_FOR_ANONIM
      );

    const { favorites } = await this.users.whereId(user.sub);

    const index = favorites.indexOf(product.id);

    if (index === -1) favorites.push(product.id);

    return { ...product, favorite: true };
  }

  @Mutation('removeFavorite')
  async removeFavorites(@Args('id') id: string, @Context() { user }: GQLContext) {
    if (!user)
      throw new HttpException(
        ERROR_CODE_MESSAGES.NOT_WORK_FOR_ANONIM,
        ERROR_CODE.NOT_WORK_FOR_ANONIM
      );

    const product = await this.products.whereId(id);

    if (!product)
      throw new HttpException(
        ERROR_CODE_MESSAGES.NOT_FOUND_PRODUCT,
        ERROR_CODE.NOT_WORK_FOR_ANONIM
      );

    const { favorites } = await this.users.whereId(user.sub);

    const index = favorites.indexOf(product.id);

    if (index !== -1) favorites.splice(index, 1);

    return { ...product, favorite: false };
  }
}
