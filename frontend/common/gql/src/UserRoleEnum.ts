/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum UserRole {
  ANONIM="ANONIM",
USER="USER",
ADMIN="ADMIN"
}

/**
* UserRole
*/
export const UserRoleEnumType = types.enumeration("UserRole", [
        "ANONIM",
  "USER",
  "ADMIN",
      ])
