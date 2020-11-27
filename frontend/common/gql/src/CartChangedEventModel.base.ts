/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrderModel, OrderModelType } from "./OrderModel"
import { OrderModelSelector } from "./OrderModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  order: OrderModelType;
}

/**
 * CartChangedEventBase
 * auto generated base class for the model CartChangedEventModel.
 */
export const CartChangedEventModelBase = withTypedRefs<Refs>()(ModelBase
  .named('CartChangedEvent')
  .props({
    __typename: types.optional(types.literal("CartChangedEvent"), "CartChangedEvent"),
    order: types.union(types.undefined, MSTGQLRef(types.late((): any => OrderModel))),
    date: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CartChangedEventModelSelector extends QueryBuilder {
  get date() { return this.__attr(`date`) }
  order(builder?: string | OrderModelSelector | ((selector: OrderModelSelector) => OrderModelSelector)) { return this.__child(`order`, OrderModelSelector, builder) }
}
export function selectFromCartChangedEvent() {
  return new CartChangedEventModelSelector()
}

export const cartChangedEventModelPrimitives = selectFromCartChangedEvent().date
