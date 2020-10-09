import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PRODUCTS } from '@api/db';

@Injectable()
export default class ProductsService {
  idsBatcher = new DataLoader((ids: string[]) =>
    Promise.resolve(ids.map((id) => PRODUCTS.find((v) => v.id === id)))
  );

  all() {
    return PRODUCTS;
  }

  whereId(id: string) {
    return this.idsBatcher.load(id);
  }

  whereIds(ids: string[]) {
    return this.idsBatcher.loadMany(ids);
  }
}
