import { Module, forwardRef } from '@nestjs/common';
import ProductsResolvers from './products.resolvers';
import ProductsService from './products.service';
import CategoriesModule from '@api/modules/categories/categories.module';
import UsersModule from '@api/modules/users/users.module';

@Module({
  providers: [ProductsService, ProductsResolvers],
  imports: [forwardRef(() => CategoriesModule), forwardRef(() => UsersModule)],
  exports: [ProductsService],
})
export default class ProductsModule {}
