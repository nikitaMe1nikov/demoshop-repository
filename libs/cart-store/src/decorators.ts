import { createActionAndEffect } from '@nimel/directorr';
import { OrderModelType } from '@demo/mst-gql';

export interface SetCartPayload {
  cart: OrderModelType;
}

export interface SortPayload {
  sort: number;
}

export const [actionSetSort, effectSetSort] = createActionAndEffect<SortPayload>(
  'CartStore.SET_CURRENT_SORT'
);
export const [actionSetCart, effectSetCart] = createActionAndEffect<SetCartPayload>(
  'CartStore.SET_CART'
);
export const [actionUpdateCart, effectUpdateCart] = createActionAndEffect('CartStore.UPDATE');
export const [actionFillCart, effectFillCart] = createActionAndEffect<void>('CartStore.FILL_CART');
export const [actionEndLoadingCart, effectEndLoadingCart] = createActionAndEffect<void>(
  'CartStore.END_LOADING'
);
export const [actionFillCartSuccess, effectFillCartSucces] = createActionAndEffect<void>(
  'CartStore.FILL_CART_SUCCESS'
);
