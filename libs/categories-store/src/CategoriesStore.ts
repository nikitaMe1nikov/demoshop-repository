import { observable } from 'mobx';
import { effect, injectStore, whenInit, whenReload, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
import { NextHistoryStore, HISTORY_ACTIONS } from '@nimel/directorr-next';
import { Category as CategoryType } from '@demo/gql-schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  GQLPayload,
} from '@demo/sagas';
import { CATEGORY_URL } from '@demo/url';

const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export type Category = Pick<CategoryType, 'id' | 'name'>;

export class CategoriesStore {
  @observable.ref categories?: Category[];
  @observable currentCategoryID?: string;
  @observable isLoading = false;

  @injectStore(NextHistoryStore) nextHistoryStore: NextHistoryStore;

  @whenReload
  @actionGQLQuery
  getCategories = () => ({ query: CATEGORIES_QUERY });

  @effectGQLQuerySuccess
  @whenPayload({ query: CATEGORIES_QUERY })
  setCategories = ({ data: { categories } }: GQLPayload) => {
    this.categories = categories;
  };

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: CATEGORIES_QUERY })
  changeLoading = ({ data, errors }: GQLPayload) => {
    this.isLoading = !(data || errors);
  };

  @whenInit
  toInit = () => {
    if (!this.isReady) this.getCategories();

    if (this.nextHistoryStore.isCurrentPattern(CATEGORY_URL)) {
      this.currentCategoryID = this.nextHistoryStore.queryObject.categoryID as string;
    }
  };

  @effect(HISTORY_ACTIONS.POP)
  toRouteChange = ({ queryObject, pattern }) => {
    this.currentCategoryID = pattern === CATEGORY_URL ? queryObject.categoryID : undefined;
  };

  get isReady() {
    return !!this.categories;
  }
}
