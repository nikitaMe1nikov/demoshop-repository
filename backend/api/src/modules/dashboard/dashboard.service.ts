import { Injectable } from '@nestjs/common';
import { BANNERS } from '../../db';

@Injectable()
export default class ProductsService {
  all() {
    return BANNERS;
  }
}
