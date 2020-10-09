import { createActionAndEffect } from '@nimel/directorr';
import { ProductsSort } from '@demo/gql-schema';

export interface SortPayload {
  sort: ProductsSort;
}

export interface PagePayload {
  page: number;
}

export const [actionSetSort, effectSetSort] = createActionAndEffect<SortPayload>(
  'PRODUCTS.SET_CURRENT_SORT'
);
export const [actionLoadMore, effectLoadMore] = createActionAndEffect<void>(
  'PRODUCTS.LOAD_MORE_PRODUCTS'
);
export const [actionSetPage, effectSetPage] = createActionAndEffect<PagePayload>(
  'PRODUCTS.SET_PAGE_PRODUCTS'
);
