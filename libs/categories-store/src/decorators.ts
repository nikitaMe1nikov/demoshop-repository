import { createActionAndEffect } from '@nimel/directorr';
import { CategoryModelType, selectFromCategory } from '@demo/mst-gql';

export interface CategoriesPayload {
  categories: CategoryModelType[];
}

export const [actionSetCategories, effectSetCategories] = createActionAndEffect<CategoriesPayload>(
  'CategoriesStore.setCategories'
);
