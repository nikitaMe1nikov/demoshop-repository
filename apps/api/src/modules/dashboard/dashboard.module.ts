import { Module, forwardRef } from '@nestjs/common';
import DashboardResolvers from './dashboard.resolvers';
import DashboardService from './dashboard.service';
import CategoriesModule from 'modules/categories/categories.module';

@Module({
  providers: [DashboardService, DashboardResolvers],
  imports: [forwardRef(() => CategoriesModule)],
})
export default class ProductsModule {}
