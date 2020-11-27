/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrderStatusEnumType } from "./OrderStatusEnum"
import { ProductModel, ProductModelType } from "./ProductModel"
import { ProductModelSelector } from "./ProductModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  products: IObservableArray<ProductModelType>;
}

/**
 * OrderBase
 * auto generated base class for the model OrderModel.
 */
export const OrderModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Order')
  .props({
    __typename: types.optional(types.literal("Order"), "Order"),
    id: types.identifier,
    status: types.union(types.undefined, OrderStatusEnumType),
    total: types.union(types.undefined, types.integer),
    price: types.union(types.undefined, types.integer),
    discount: types.union(types.undefined, types.integer),
    products: types.union(types.undefined, types.array(types.union(types.null, MSTGQLRef(types.late((): any => ProductModel))))),
    totalByID: types.union(types.undefined, types.array(types.union(types.null, types.string))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class OrderModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get status() { return this.__attr(`status`) }
  get total() { return this.__attr(`total`) }
  get price() { return this.__attr(`price`) }
  get discount() { return this.__attr(`discount`) }
  get totalByID() { return this.__attr(`totalByID`) }
  products(builder?: string | ProductModelSelector | ((selector: ProductModelSelector) => ProductModelSelector)) { return this.__child(`products`, ProductModelSelector, builder) }
}
export function selectFromOrder() {
  return new OrderModelSelector()
}

export const orderModelPrimitives = selectFromOrder().status.total.price.discount.totalByID
