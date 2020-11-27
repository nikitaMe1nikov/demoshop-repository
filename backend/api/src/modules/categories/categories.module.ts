import { Module, forwardRef } from '@nestjs/common';
import CategoriesResolvers from './categories.resolvers';
import CategoriesService from './categories.service';
import ProductsModule from '../products/products.module';

@Module({
  providers: [CategoriesService, CategoriesResolvers],
  exports: [CategoriesService],
  imports: [forwardRef(() => ProductsModule)],
})
export default class CategoriesModule {}
