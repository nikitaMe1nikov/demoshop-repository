import { createActionAndEffect } from '@nimel/directorr';
import { ProductModelType } from '@frontend/gql';

export interface ProductsPayload {
  products: ProductModelType[];
}

export const [actionSetFavoritesProducts, effectSetFavoritesProducts] = createActionAndEffect<
  ProductsPayload
>('FavoritesStore.SET_PRODUCTS');
