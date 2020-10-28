import { observable } from 'mobx';
import { whenInit, whenReload, whenPayload, DirectorrStoreClass } from '@nimel/directorr';
import { historyChange, HistoryChangeActionPayload } from '@nimel/directorr-router';
import { Banner } from '@demo/gql-schema';
import gql from 'graphql-tag';
import { ROOT_URL } from '@demo/url';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  GQLPayload,
} from '@demo/sagas';
export type { Banner } from '@demo/gql-schema';

const BANNERS_QUERY = gql`
  query {
    banners {
      id
      name
      description
      images {
        small
        medium
        big
      }
    }
  }
`;

export class DashboardStore implements DirectorrStoreClass {
  @observable.ref banners?: Banner[];
  @observable isLoading = true;

  @whenReload
  @actionGQLQuery
  getBanners = () => ({ query: BANNERS_QUERY });

  @effectGQLQueryLoading
  @effectGQLQueryError
  @effectGQLQuerySuccess
  @whenPayload({ query: BANNERS_QUERY })
  whenLoading = ({ data, errors }: GQLPayload) => {
    this.isLoading = !(data || errors);
  };

  @effectGQLQuerySuccess
  @whenPayload({ query: BANNERS_QUERY })
  setBanners = ({ data: { banners } }: GQLPayload) => {
    this.banners = banners;
  };

  @whenInit
  toInit = () => {
    if (!this.isReady) this.getBanners();
  };

  @historyChange(ROOT_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match && this.isReady) this.getBanners();
  };

  get isReady() {
    return !!this.banners;
  }
}
