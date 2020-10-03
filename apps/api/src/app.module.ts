import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import ProductsModule from 'modules/products/products.module';
import CategoriesModule from 'modules/categories/categories.module';
import UsersModule from 'modules/users/users.module';
import DashboardModule from 'modules/dashboard/dashboard.module';
import OrdersModule from 'modules/orders/orders.module';
import PubsubService from 'modules/pubsub/pubsub.service';
import { JWT_SECRET } from 'CONSTANTS';
import GraphqlOptions from './GraphqlOptions';

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
      global: true,
    },
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    CategoriesModule,
    ProductsModule,
    UsersModule,
    DashboardModule,
    OrdersModule,
  ],
  exports: [JwtModule],
  providers: [PubsubService],
})
export default class AppModule {}
