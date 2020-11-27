/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { CategoryModel, CategoryModelType } from "./CategoryModel"
import { categoryModelPrimitives, CategoryModelSelector } from "./CategoryModel.base"
import { BannerModel, BannerModelType } from "./BannerModel"
import { bannerModelPrimitives, BannerModelSelector } from "./BannerModel.base"
import { ImageModel, ImageModelType } from "./ImageModel"
import { imageModelPrimitives, ImageModelSelector } from "./ImageModel.base"
import { CartChangedEventModel, CartChangedEventModelType } from "./CartChangedEventModel"
import { cartChangedEventModelPrimitives, CartChangedEventModelSelector } from "./CartChangedEventModel.base"
import { ProductModel, ProductModelType } from "./ProductModel"
import { productModelPrimitives, ProductModelSelector } from "./ProductModel.base"
import { OrderModel, OrderModelType } from "./OrderModel"
import { orderModelPrimitives, OrderModelSelector } from "./OrderModel.base"
import { ProductsModel, ProductsModelType } from "./ProductsModel"
import { productsModelPrimitives, ProductsModelSelector } from "./ProductsModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"


import { UserRole } from "./UserRoleEnum"
import { OrderStatus } from "./OrderStatusEnum"
import { ProductsSort } from "./ProductsSortEnum"

export type UserSignupInput = {
  email: any
  password: any
  name: any
  surname?: any
}
export type UserLoginInput = {
  email: any
  password: any
}
export type UserInfoInput = {
  email: any
  name: any
  surname?: any
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  categories: ObservableMap<string, CategoryModelType>,
  banners: ObservableMap<string, BannerModelType>,
  products: ObservableMap<string, ProductModelType>,
  orders: ObservableMap<string, OrderModelType>,
  users: ObservableMap<string, UserModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryCategories="queryCategories",
queryCategory="queryCategory",
queryBanners="queryBanners",
queryCart="queryCart",
queryOrders="queryOrders",
queryProducts="queryProducts",
queryFavorites="queryFavorites",
queryProduct="queryProduct",
queryMe="queryMe"
}
export enum RootStoreBaseMutations {
mutateAddToCart="mutateAddToCart",
mutateRemoveFromCart="mutateRemoveFromCart",
mutateDeleteFromCart="mutateDeleteFromCart",
mutateFillCart="mutateFillCart",
mutateAddFavorite="mutateAddFavorite",
mutateRemoveFavorite="mutateRemoveFavorite",
mutateSignup="mutateSignup",
mutateLogin="mutateLogin",
mutateLogout="mutateLogout",
mutateSaveProfile="mutateSaveProfile"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Category', () => CategoryModel], ['Banner', () => BannerModel], ['Image', () => ImageModel], ['CartChangedEvent', () => CartChangedEventModel], ['Product', () => ProductModel], ['Order', () => OrderModel], ['Products', () => ProductsModel], ['User', () => UserModel]], ['Category', 'Banner', 'Product', 'Order', 'User'], "js"))
  .props({
    categories: types.optional(types.map(types.late((): any => CategoryModel)), {}),
    banners: types.optional(types.map(types.late((): any => BannerModel)), {}),
    products: types.optional(types.map(types.late((): any => ProductModel)), {}),
    orders: types.optional(types.map(types.late((): any => OrderModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {})
  })
  .actions(self => ({
    queryCategories(variables?: {  }, resultSelector: string | ((qb: CategoryModelSelector) => CategoryModelSelector) = categoryModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ categories: CategoryModelType[]}>(`query categories { categories {
        ${typeof resultSelector === "function" ? resultSelector(new CategoryModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCategory(variables: { id?: string }, resultSelector: string | ((qb: CategoryModelSelector) => CategoryModelSelector) = categoryModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ category: CategoryModelType}>(`query category($id: String) { category(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new CategoryModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryBanners(variables?: {  }, resultSelector: string | ((qb: BannerModelSelector) => BannerModelSelector) = bannerModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ banners: BannerModelType[]}>(`query banners { banners {
        ${typeof resultSelector === "function" ? resultSelector(new BannerModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCart(variables?: {  }, resultSelector: string | ((qb: OrderModelSelector) => OrderModelSelector) = orderModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ cart: OrderModelType}>(`query cart { cart {
        ${typeof resultSelector === "function" ? resultSelector(new OrderModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryOrders(variables?: {  }, resultSelector: string | ((qb: OrderModelSelector) => OrderModelSelector) = orderModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ orders: OrderModelType[]}>(`query orders { orders {
        ${typeof resultSelector === "function" ? resultSelector(new OrderModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryProducts(variables: { categoryId: string, sort?: ProductsSort, first?: number, after?: number }, resultSelector: string | ((qb: ProductsModelSelector) => ProductsModelSelector) = productsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ products: ProductsModelType}>(`query products($categoryId: String!, $sort: ProductsSort, $first: Int, $after: Int) { products(categoryID: $categoryId, sort: $sort, first: $first, after: $after) {
        ${typeof resultSelector === "function" ? resultSelector(new ProductsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryFavorites(variables?: {  }, resultSelector: string | ((qb: ProductModelSelector) => ProductModelSelector) = productModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ favorites: ProductModelType[]}>(`query favorites { favorites {
        ${typeof resultSelector === "function" ? resultSelector(new ProductModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryProduct(variables: { id?: string }, resultSelector: string | ((qb: ProductModelSelector) => ProductModelSelector) = productModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ product: ProductModelType}>(`query product($id: String) { product(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ProductModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMe(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ me: UserModelType}>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateAddToCart(variables: { productId: string }, resultSelector: string | ((qb: OrderModelSelector) => OrderModelSelector) = orderModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addToCart: OrderModelType}>(`mutation addToCart($productId: String!) { addToCart(productID: $productId) {
        ${typeof resultSelector === "function" ? resultSelector(new OrderModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateRemoveFromCart(variables: { productId: string }, resultSelector: string | ((qb: OrderModelSelector) => OrderModelSelector) = orderModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ removeFromCart: OrderModelType}>(`mutation removeFromCart($productId: String!) { removeFromCart(productID: $productId) {
        ${typeof resultSelector === "function" ? resultSelector(new OrderModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteFromCart(variables: { productId: string }, resultSelector: string | ((qb: OrderModelSelector) => OrderModelSelector) = orderModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteFromCart: OrderModelType}>(`mutation deleteFromCart($productId: String!) { deleteFromCart(productID: $productId) {
        ${typeof resultSelector === "function" ? resultSelector(new OrderModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateFillCart(variables?: {  }, resultSelector: string | ((qb: OrderModelSelector) => OrderModelSelector) = orderModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ fillCart: OrderModelType}>(`mutation fillCart { fillCart {
        ${typeof resultSelector === "function" ? resultSelector(new OrderModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateAddFavorite(variables: { id?: string }, resultSelector: string | ((qb: ProductModelSelector) => ProductModelSelector) = productModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addFavorite: ProductModelType}>(`mutation addFavorite($id: String) { addFavorite(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ProductModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateRemoveFavorite(variables: { id?: string }, resultSelector: string | ((qb: ProductModelSelector) => ProductModelSelector) = productModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ removeFavorite: ProductModelType}>(`mutation removeFavorite($id: String) { removeFavorite(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ProductModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSignup(variables: { userSignupInput: UserSignupInput }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ signup: UserModelType}>(`mutation signup($userSignupInput: UserSignupInput!) { signup(userSignupInput: $userSignupInput) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLogin(variables: { userLoginInput: UserLoginInput }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: UserModelType}>(`mutation login($userLoginInput: UserLoginInput!) { login(userLoginInput: $userLoginInput) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLogout(variables?: {  }, optimisticUpdate?: () => void) {
      return self.mutate<{ logout: boolean }>(`mutation logout { logout }`, variables, optimisticUpdate)
    },
    mutateSaveProfile(variables: { userInfoInput?: UserInfoInput }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ saveProfile: UserModelType}>(`mutation saveProfile($userInfoInput: UserInfoInput) { saveProfile(userInfoInput: $userInfoInput) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    subscribeCartChanged(variables: { userId: string }, resultSelector: string | ((qb: CartChangedEventModelSelector) => CartChangedEventModelSelector) = cartChangedEventModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ cartChanged: CartChangedEventModelType}>(`subscription cartChanged($userId: String!) { cartChanged(userID: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new CartChangedEventModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
  })))
