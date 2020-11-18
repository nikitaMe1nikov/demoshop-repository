/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ProductModel, ProductModelType } from "./ProductModel"
import { ProductModelSelector } from "./ProductModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<ProductModelType>;
}

/**
 * ProductsBase
 * auto generated base class for the model ProductsModel.
 */
export const ProductsModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Products')
  .props({
    __typename: types.optional(types.literal("Products"), "Products"),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ProductModel)))),
    total: types.union(types.undefined, types.integer),
    endCursor: types.union(types.undefined, types.integer),
    hasNextPage: types.union(types.undefined, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ProductsModelSelector extends QueryBuilder {
  get total() { return this.__attr(`total`) }
  get endCursor() { return this.__attr(`endCursor`) }
  get hasNextPage() { return this.__attr(`hasNextPage`) }
  nodes(builder?: string | ProductModelSelector | ((selector: ProductModelSelector) => ProductModelSelector)) { return this.__child(`nodes`, ProductModelSelector, builder) }
}
export function selectFromProducts() {
  return new ProductsModelSelector()
}

export const productsModelPrimitives = selectFromProducts().total.endCursor.hasNextPage
