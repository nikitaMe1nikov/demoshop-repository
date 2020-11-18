import { createActionAndEffect } from '@nimel/directorr';
import { ProductModelType } from '@demo/mst-gql';

export interface ProductsPayload {
  products: ProductModelType[];
}

export const [actionSetFavoritesProducts, effectSetFavoritesProducts] = createActionAndEffect<
  ProductsPayload
>('FavoritesStore.SET_PRODUCTS');
