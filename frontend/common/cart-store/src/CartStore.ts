import { observable, computed } from 'mobx';
import { whenInit, whenReload, injectStore } from '@nimel/directorr';
import {
  historyChange,
  HistoryChangeActionPayload,
  actionRouterPush,
} from '@nimel/directorr-router';
import {
  RootStore,
  RootStoreType,
  ProductModelType,
  CHANGE_CART_QUERY,
  FetchPolicy,
} from '@frontend/gql';
import { CART_URL, ORDERS_URL } from '@frontend/url';
import {
  actionSetSort,
  effectSetSort,
  actionSetCart,
  effectSetCart,
  SortPayload,
  actionUpdateCart,
  effectUpdateCart,
  SetCartPayload,
  actionFillCart,
  effectFillCart,
  actionEndLoadingCart,
  effectEndLoadingCart,
  actionFillCartSuccess,
  effectFillCartSucces,
} from './decorators';

enum ProductsSort {
  ALPHABET,
  PRICE_DSC,
}

export class CartStore {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable total?: number;
  @observable price?: number;
  @observable discount?: number;
  @observable.ref products: ProductModelType[] = [];
  @observable isLoadingFill = false;
  @observable isUpdating = false;
  @observable currentSort: ProductsSort = ProductsSort.ALPHABET;
  sortList = Object.keys(ProductsSort);

  @computed get isLoading() {
    return this.total === undefined;
  }

  @computed get sortProducts() {
    if (this.currentSort === ProductsSort.PRICE_DSC) {
      return this.products.sort((a, b) =>
        a.price !== undefined && b.price !== undefined && a.price < b.price ? -1 : 0
      );
    }

    return this.products;
  }

  @computed get isEmpty() {
    return !this.total;
  }

  @actionSetSort
  setCurrentSort = (sort: ProductsSort) => ({ sort });

  @effectSetSort
  toCurrentSort = ({ sort }: SortPayload) => {
    this.currentSort = sort;
  };

  @actionUpdateCart
  update = () => {};

  @effectUpdateCart
  toUpdateCart = () => {
    this.isUpdating = true;

    this.getCart('network-only');
  };

  @whenReload
  getCart = (fetchPolicy?: FetchPolicy) => {
    const { data, promise } = this.rootStore.qCart({}, CHANGE_CART_QUERY, {
      fetchPolicy,
    });

    if (data?.cart && !this.isReady) {
      this.whenHaveCart(data);
    }

    promise.tap(this.whenHaveCart).finally(this.doneLoading);
  };

  @whenInit
  init = () => {
    this.getCart();
  };

  @actionSetCart
  whenHaveCart = ({ cart }: SetCartPayload) => ({ cart });

  @effectSetCart
  setCart = ({ cart: { total, price, discount, products } }: SetCartPayload) => {
    this.total = total;
    this.price = price;
    this.discount = discount;
    this.products = [...products];
  };

  @actionEndLoadingCart
  doneLoading = () => {};

  @effectEndLoadingCart
  toDoneLoading = () => {
    this.isUpdating = false;
    this.isLoadingFill = false;
  };

  @actionFillCart
  fillCart = () => {};

  @effectFillCart
  toFillCart = () => {
    this.isLoadingFill = true;

    this.rootStore
      .mFillCart({}, CHANGE_CART_QUERY)
      .promise.tap(this.whenFillCart)
      .finally(this.doneLoading);
  };

  @actionFillCartSuccess
  whenFillCart = () => {};

  @effectFillCartSucces
  @actionRouterPush
  updateCart = () => {
    this.update();

    return {
      path: ORDERS_URL,
    };
  };

  @historyChange(CART_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match) this.update();
  };

  get isReady() {
    return this.total !== undefined;
  }

  toJSON() {}
}
