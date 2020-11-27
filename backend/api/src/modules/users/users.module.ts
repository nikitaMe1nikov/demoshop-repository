import { Module, forwardRef } from '@nestjs/common';
import UsersResolvers from './users.resolvers';
import UsersService from './users.service';
import OrdersModule from '../orders/orders.module';

@Module({
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
  imports: [forwardRef(() => OrdersModule)],
})
export default class UsersModule {}
