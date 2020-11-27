/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ImageBase
 * auto generated base class for the model ImageModel.
 */
export const ImageModelBase = ModelBase
  .named('Image')
  .props({
    __typename: types.optional(types.literal("Image"), "Image"),
    small: types.union(types.undefined, types.string),
    medium: types.union(types.undefined, types.string),
    big: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ImageModelSelector extends QueryBuilder {
  get small() { return this.__attr(`small`) }
  get medium() { return this.__attr(`medium`) }
  get big() { return this.__attr(`big`) }
}
export function selectFromImage() {
  return new ImageModelSelector()
}

export const imageModelPrimitives = selectFromImage().small.medium.big
