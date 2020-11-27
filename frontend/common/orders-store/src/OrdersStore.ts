import { observable, computed } from 'mobx';
import { whenInit, whenReload, injectStore } from '@nimel/directorr';
import { historyChange, HistoryChangeActionPayload } from '@nimel/directorr-router';
import {
  RootStore,
  RootStoreType,
  selectFromOrder,
  OrderModelType,
  FetchPolicy,
} from '@frontend/gql';
import { ORDERS_URL } from '@frontend/url';
import {
  actionUpdateOrders,
  effectUpdateOrders,
  actionSetOrders,
  effectSetOrders,
  SetOrdersPayload,
  actionEndLodingOrders,
  effectEndLodingOrders,
} from './decorators';

const ORDERS_QUERY = selectFromOrder()
  .total.price.discount.status.totalByID.products((product) => product.name.price.favorite)
  .toString();

export class OrdersStore {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.ref orders?: OrderModelType[];
  @observable isUpdating = false;

  @computed get isLoading() {
    return !this.orders;
  }

  @actionUpdateOrders
  update = () => {};

  @effectUpdateOrders
  toUpdate = () => {
    this.isUpdating = true;

    this.getOrders('network-only');
  };

  @whenReload
  getOrders = (fetchPolicy?: FetchPolicy) => {
    const { data, promise } = this.rootStore.qOrders({}, ORDERS_QUERY, {
      fetchPolicy,
    });

    if (data?.orders && !this.isReady) {
      this.whenHaveOrders(data);
    }

    promise.tap(this.whenHaveOrders).finally(this.doneLoading);
  };

  @whenInit
  init = () => {
    this.getOrders();
  };

  @actionSetOrders
  whenHaveOrders = ({ orders }: SetOrdersPayload) => ({ orders });

  @effectSetOrders
  setOrders = ({ orders }: SetOrdersPayload) => {
    this.orders = orders;
  };

  @actionEndLodingOrders
  doneLoading = () => {};

  @effectEndLodingOrders
  toDoneLoading = () => {
    this.isUpdating = false;
  };

  @historyChange(ORDERS_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match) this.update();
  };

  get isReady() {
    return !!this.orders;
  }

  toJSON() {}
}
