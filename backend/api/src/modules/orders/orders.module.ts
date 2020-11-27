import { Module, forwardRef } from '@nestjs/common';
import ProductsModule from '../products/products.module';
import OrdersResolvers from './orders.resolvers';
import OrdersService from './orders.service';
import UsersModule from '../users/users.module';
import PubsubService from '../pubsub/pubsub.service';

@Module({
  providers: [OrdersService, OrdersResolvers, PubsubService],
  exports: [OrdersService],
  imports: [forwardRef(() => ProductsModule), forwardRef(() => UsersModule)],
})
export default class OrdersModule {}
