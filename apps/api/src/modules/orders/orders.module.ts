import { Module, forwardRef } from '@nestjs/common';
import ProductsModule from 'modules/products/products.module';
import OrdersResolvers from './orders.resolvers';
import OrdersService from './orders.service';
import UsersModule from 'modules/users/users.module';
import PubsubService from 'modules/pubsub/pubsub.service';

@Module({
  providers: [OrdersService, OrdersResolvers, PubsubService],
  exports: [OrdersService],
  imports: [forwardRef(() => ProductsModule), forwardRef(() => UsersModule)],
})
export default class OrdersModule {}
