import { createActionAndEffect } from '@nimel/directorr';
import { Order } from '@demo/gql-schema';

export interface SortPayload {
  sort: number;
}

export const [actionSetSort, effectSetSort] = createActionAndEffect<SortPayload>(
  'CART.SET_CURRENT_SORT'
);
export const [actionSetCart, effectSetCart] = createActionAndEffect<Order>('CART.SET_CART');
export const [actionUpdateCart, effectUpdateCart] = createActionAndEffect('CART.UPDATE');
