import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { CATEGORIES } from '@api/db';

@Injectable()
export default class CategoriesService {
  idsBatcher = new DataLoader(((ids: string[]) =>
    Promise.resolve(ids.map((id) => CATEGORIES.find((v) => v.id === id)))) as any);

  all() {
    return CATEGORIES;
  }

  whereId(id: string) {
    return this.idsBatcher.load(id);
  }

  whereIds(ids: string[]) {
    return this.idsBatcher.loadMany(ids);
  }
}
