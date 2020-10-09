import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import ProductsModule from '@api/modules/products/products.module';
import CategoriesModule from '@api/modules/categories/categories.module';
import UsersModule from '@api/modules/users/users.module';
import DashboardModule from '@api/modules/dashboard/dashboard.module';
import OrdersModule from '@api/modules/orders/orders.module';
import PubsubService from '@api/modules/pubsub/pubsub.service';
import { JWT_SECRET } from '@api/CONSTANTS';
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
