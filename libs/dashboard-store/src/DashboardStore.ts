import { observable } from 'mobx';
import { whenInit, whenReload, whenPayload, DirectorrStoreClass } from '@nimel/directorr';
import { Banner } from '@demo/gql-schema';
import gql from 'graphql-tag';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  GQLPayload,
} from '@demo/sagas';

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

  get isReady() {
    return !!this.banners;
  }
}
