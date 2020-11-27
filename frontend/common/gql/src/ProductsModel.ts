import { Instance } from 'mobx-state-tree';
import { ProductsModelBase } from './ProductsModel.base';

/* The TypeScript type of an instance of ProductsModel */
export interface ProductsModelType extends Instance<typeof ProductsModel.Type> {}

/* A graphql query fragment builders for ProductsModel */
export {
  selectFromProducts,
  productsModelPrimitives,
  ProductsModelSelector,
} from './ProductsModel.base';

/**
 * ProductsModel
 */
export const ProductsModel = ProductsModelBase;
