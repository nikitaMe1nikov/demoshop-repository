import { Instance } from 'mobx-state-tree';
import { CategoryModelBase } from './CategoryModel.base';

/* The TypeScript type of an instance of CategoryModel */
export type CategoryModelType = Instance<typeof CategoryModel.Type>;

/* A graphql query fragment builders for CategoryModel */
export {
  selectFromCategory,
  categoryModelPrimitives,
  CategoryModelSelector,
} from './CategoryModel.base';

/**
 * CategoryModel
 */
export const CategoryModel = CategoryModelBase;
