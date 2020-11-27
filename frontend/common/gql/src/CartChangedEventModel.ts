import { Instance } from 'mobx-state-tree';
import { CartChangedEventModelBase } from './CartChangedEventModel.base';

/* The TypeScript type of an instance of CartChangedEventModel */
export interface CartChangedEventModelType extends Instance<typeof CartChangedEventModel.Type> {}

/* A graphql query fragment builders for CartChangedEventModel */
export {
  selectFromCartChangedEvent,
  cartChangedEventModelPrimitives,
  CartChangedEventModelSelector,
} from './CartChangedEventModel.base';

/**
 * CartChangedEventModel
 */
export const CartChangedEventModel = CartChangedEventModelBase;
