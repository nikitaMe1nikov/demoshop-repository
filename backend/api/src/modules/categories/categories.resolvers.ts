import { Args, Query, Resolver } from '@nestjs/graphql';
import CategoriesService from './categories.service';

@Resolver('Category')
export default class CategoriesResolvers {
  constructor(private readonly categories: CategoriesService) {}

  @Query('categories')
  all() {
    return this.categories.all();
  }

  @Query('category')
  async categorytWhere(@Args('id') id: string) {
    return await this.categories.whereId(id);
  }
}
