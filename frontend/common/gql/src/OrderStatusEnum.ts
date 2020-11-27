/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrderStatus {
  CREATED="CREATED",
FILLED="FILLED",
COMPLATED="COMPLATED"
}

/**
* OrderStatus
*/
export const OrderStatusEnumType = types.enumeration("OrderStatus", [
        "CREATED",
  "FILLED",
  "COMPLATED",
      ])
