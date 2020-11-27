/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ImageModel, ImageModelType } from "./ImageModel"
import { ImageModelSelector } from "./ImageModel.base"
import { RootStoreType } from "./index"


/**
 * BannerBase
 * auto generated base class for the model BannerModel.
 */
export const BannerModelBase = ModelBase
  .named('Banner')
  .props({
    __typename: types.optional(types.literal("Banner"), "Banner"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    description: types.union(types.undefined, types.string),
    images: types.union(types.undefined, types.late((): any => ImageModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class BannerModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get description() { return this.__attr(`description`) }
  images(builder?: string | ImageModelSelector | ((selector: ImageModelSelector) => ImageModelSelector)) { return this.__child(`images`, ImageModelSelector, builder) }
}
export function selectFromBanner() {
  return new BannerModelSelector()
}

export const bannerModelPrimitives = selectFromBanner().name.description
