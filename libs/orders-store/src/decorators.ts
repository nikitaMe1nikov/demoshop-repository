import { createActionAndEffect } from '@nimel/directorr';
import { OrderModelType } from '@demo/mst-gql';

export interface SetOrdersPayload {
  orders: OrderModelType[];
}

export const [actionSetOrders, effectSetOrders] = createActionAndEffect<SetOrdersPayload>(
  'OrdersStore.SET_ORDERS'
);
export const [actionUpdateOrders, effectUpdateOrders] = createActionAndEffect<void>(
  'OrdersStore.UPDATE_ORDERS'
);
export const [actionEndLodingOrders, effectEndLodingOrders] = createActionAndEffect<void>(
  'OrdersStore.END_LOADING'
);
