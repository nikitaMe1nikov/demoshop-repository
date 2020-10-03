import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import type { CategoryData } from 'db';
import CategoriesService from './categories.service';
import ProductsService from 'modules/products/products.service';

@Resolver('Category')
export default class CategoriesResolvers {
  constructor(
    private readonly categories: CategoriesService,
    private readonly products: ProductsService
  ) {}

  @Query('categories')
  all() {
    return this.categories.all();
  }

  @Query('category')
  async categorytWhere(@Args('id') id: string) {
    return await this.categories.whereId(id);
  }

  @ResolveField('products')
  async category(@Parent() category: CategoryData) {
    const { productsIDS } = category;
    return await this.products.whereIds(productsIDS);
  }
}
