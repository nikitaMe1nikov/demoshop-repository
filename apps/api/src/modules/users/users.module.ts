import { Module, forwardRef } from '@nestjs/common';
import UsersResolvers from './users.resolvers';
import UsersService from './users.service';
import ProductsModule from 'modules/products/products.module';
import OrdersModule from 'modules/orders/orders.module';

@Module({
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
  imports: [forwardRef(() => ProductsModule), forwardRef(() => OrdersModule)],
})
export default class UsersModule {}
