import { observable } from 'mobx';
import { whenInit, whenReload, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
import { Order as OrderType, Product as ProductType } from '@demo/gql-schema';
import {
  historyChange,
  HistoryChangeActionPayload,
  actionRouterPush,
} from '@nimel/directorr-router';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  GQLPayload,
  FETCH_POLICY,
} from '@demo/sagas';
import { ORDERS_URL } from '@demo/url';
import {actionUpdateOrders, effectUpdateOrders} from './decorators';

const ORDERS_QUERY = gql`
  query {
    orders {
      id
      total
      price
      discount
      products {
        id
        name
        price
        amount
      }
    }
  }
`;

export type Product = Pick<ProductType, 'id' | 'name' | 'price' | 'amount'>;
export type Order = Pick<OrderType, 'id' | 'total' | 'price' | 'discount'> & {
  products: Product[];
};

export class OrdersStore {
  @observable.ref orders?: Order[];
  @observable isLoading = true;
  @observable isUpdating = false;

  @actionUpdateOrders
  update = () => {};

  @effectUpdateOrders
  toUpdate = () => {
    this.getOrders({
      update: true,
    });
  };

  @whenReload
  @actionGQLQuery
  getOrders = (variables?: any) => ({ query: ORDERS_QUERY, fetchPolicy: FETCH_POLICY.NETWORK_ONLY, variables });

  @effectGQLQuerySuccess
  @whenPayload({ query: ORDERS_QUERY })
  setOrders = ({ data: { orders } }: GQLPayload) => {
    this.orders = orders;
  };

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: ORDERS_QUERY })
  changeLoading = ({ data, errors, variables }: GQLPayload) => {
    if (data || errors) {
      this.isLoading = false;
      this.isUpdating = false;
    } else if (variables?.update) {
      this.isUpdating = true;
    }
  };

  @whenInit
  toInit = () => {
    if (!this.isReady) this.getOrders();
  };

  @historyChange(ORDERS_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match) this.update();
  };

  get isReady() {
    return !!this.orders;
  }
}
