/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { CategoryModelSelector } from "./CategoryModel.base"
import { ProductModel, ProductModelType } from "./ProductModel"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  category: CategoryModelType;
  recomendations: IObservableArray<ProductModelType>;
}

/**
 * ProductBase
 * auto generated base class for the model ProductModel.
 */
export const ProductModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Product')
  .props({
    __typename: types.optional(types.literal("Product"), "Product"),
    amount: types.union(types.undefined, types.integer),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    price: types.union(types.undefined, types.integer),
    category: types.union(types.undefined, MSTGQLRef(types.late((): any => CategoryModel))),
    favorite: types.union(types.undefined, types.boolean),
    description: types.union(types.undefined, types.null, types.string),
    recomendations: types.union(types.undefined, types.null, types.array(MSTGQLRef(types.late((): any => ProductModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ProductModelSelector extends QueryBuilder {
  get amount() { return this.__attr(`amount`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get price() { return this.__attr(`price`) }
  get favorite() { return this.__attr(`favorite`) }
  get description() { return this.__attr(`description`) }
  category(builder?: string | CategoryModelSelector | ((selector: CategoryModelSelector) => CategoryModelSelector)) { return this.__child(`category`, CategoryModelSelector, builder) }
  recomendations(builder?: string | ProductModelSelector | ((selector: ProductModelSelector) => ProductModelSelector)) { return this.__child(`recomendations`, ProductModelSelector, builder) }
}
export function selectFromProduct() {
  return new ProductModelSelector()
}

export const productModelPrimitives = selectFromProduct().amount.name.price.favorite.description
