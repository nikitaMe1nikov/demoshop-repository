import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PRODUCTS, ProductData } from '../../db';

@Injectable()
export default class ProductsService {
  idsBatcher = new DataLoader(((ids: string[]) =>
    Promise.resolve(ids.map((id) => PRODUCTS.find((v) => v.id === id)))) as any);

  all() {
    return PRODUCTS;
  }

  whereId(id: string) {
    return this.idsBatcher.load(id) as Promise<ProductData>;
  }

  whereIds(ids: string[]) {
    return this.idsBatcher.loadMany(ids) as Promise<ProductData[]>;
  }
}
