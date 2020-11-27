import { Query, Resolver } from '@nestjs/graphql';
import DashboardService from './dashboard.service';

@Resolver('Banner')
export default class DashboardResolvers {
  constructor(private readonly banners: DashboardService) {}

  @Query('banners')
  async all() {
    return this.banners.all();
  }
}
