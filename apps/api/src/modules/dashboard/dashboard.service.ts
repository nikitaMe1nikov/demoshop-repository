import { Injectable } from '@nestjs/common';
import { BANNERS } from '@api/db';

@Injectable()
export default class ProductsService {
  all() {
    return BANNERS;
  }
}
