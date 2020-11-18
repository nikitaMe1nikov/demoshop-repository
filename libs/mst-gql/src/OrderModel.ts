import { Instance } from 'mobx-state-tree';
import { OrderModelBase, selectFromOrder } from './OrderModel.base';

/* The TypeScript type of an instance of OrderModel */
export type OrderModelType = Instance<typeof OrderModel.Type>;

/* A graphql query fragment builders for OrderModel */
export { selectFromOrder, orderModelPrimitives, OrderModelSelector } from './OrderModel.base';

export const CHANGE_CART_QUERY = selectFromOrder()
  .status.total.price.products((product) => product.amount.price.name.favorite)
  .toString();

/**
 * OrderModel
 */
export const OrderModel = OrderModelBase;
