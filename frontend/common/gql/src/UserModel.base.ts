/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrderModel, OrderModelType } from "./OrderModel"
import { OrderModelSelector } from "./OrderModel.base"
import { UserRoleEnumType } from "./UserRoleEnum"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  activeOrders: IObservableArray<OrderModelType>;
}

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = withTypedRefs<Refs>()(ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    email: types.union(types.undefined, types.string),
    name: types.union(types.undefined, types.string),
    surname: types.union(types.undefined, types.string),
    roles: types.union(types.undefined, types.array(UserRoleEnumType)),
    activeOrders: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => OrderModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get email() { return this.__attr(`email`) }
  get name() { return this.__attr(`name`) }
  get surname() { return this.__attr(`surname`) }
  get roles() { return this.__attr(`roles`) }
  activeOrders(builder?: string | OrderModelSelector | ((selector: OrderModelSelector) => OrderModelSelector)) { return this.__child(`activeOrders`, OrderModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().email.name.surname.roles
