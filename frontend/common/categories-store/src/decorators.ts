import { createActionAndEffect } from '@nimel/directorr';
import { CategoryModelType } from '@frontend/gql';

export interface CategoriesPayload {
  categories: CategoryModelType[];
}

export const [actionSetCategories, effectSetCategories] = createActionAndEffect<CategoriesPayload>(
  'CategoriesStore.setCategories'
);
