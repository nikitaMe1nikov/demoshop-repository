import { createActionAndEffect } from '@nimel/directorr';
import { ProductsSort } from '@demo/gql-schema';

// export interface SortPayload {
//   sort: ProductsSort;
// }

// export interface PagePayload {
//   page: number;
// }

export const [actionUpdateOrders, effectUpdateOrders] = createActionAndEffect(
  'ORDERS.UPDATE_ORDERS'
);
