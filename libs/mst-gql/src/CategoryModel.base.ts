/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * CategoryBase
 * auto generated base class for the model CategoryModel.
 */
export const CategoryModelBase = ModelBase
  .named('Category')
  .props({
    __typename: types.optional(types.literal("Category"), "Category"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CategoryModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromCategory() {
  return new CategoryModelSelector()
}

export const categoryModelPrimitives = selectFromCategory().name
