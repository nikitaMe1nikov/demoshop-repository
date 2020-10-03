import { Module, forwardRef } from '@nestjs/common';
import CategoriesResolvers from './categories.resolvers';
import CategoriesService from './categories.service';
import ProductsModule from 'modules/products/products.module';

@Module({
  providers: [CategoriesService, CategoriesResolvers],
  exports: [CategoriesService],
  imports: [forwardRef(() => ProductsModule)],
})
export default class CategoriesModule {}
