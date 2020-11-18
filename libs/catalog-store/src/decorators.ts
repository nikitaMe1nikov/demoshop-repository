import { createActionAndEffect } from '@nimel/directorr';
import { ProductsModelType, ProductsSort, CategoryModelType } from '@demo/mst-gql';

export interface SortPayload {
  sort: ProductsSort;
}

export interface PagePayload {
  page: number;
}

export interface ProductsPayload {
  products: ProductsModelType;
}

export interface CategoryPayload {
  category: CategoryModelType;
}

export const [actionSetSort, effectSetSort] = createActionAndEffect<SortPayload>(
  'CatalogStore.SET_CURRENT_SORT'
);
export const [actionLoadMore, effectLoadMore] = createActionAndEffect<void>(
  'CatalogStore.LOAD_MORE_PRODUCTS'
);
export const [actionSetPage, effectSetPage] = createActionAndEffect<PagePayload>(
  'CatalogStore.SET_PAGE_PRODUCTS'
);
export const [actionUpdateProducts, effectUpdateProduct] = createActionAndEffect(
  'CatalogStore.UPDATE_PRODUCTS'
);
export const [actionSetProducts, effectSetProducts] = createActionAndEffect<ProductsPayload>(
  'CatalogStore.SET_PRODUCTS'
);
export const [actionSetCategory, effectSetCategory] = createActionAndEffect<CategoryPayload>(
  'CatalogStore.SET_CATEGORY'
);
