import { observable } from 'mobx';
import { effect, injectStore, whenInit, whenReload, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
import { NextHistoryStore, HISTORY_ACTIONS } from '@nimel/directorr-next';
import { Category as CategoryType } from '@api/modules/gql.schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
} from 'sagas/decorators';
import { CATEGORY_URL } from 'config/url';
import { GQLPayload } from 'sagas/types';

const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export type Category = Pick<CategoryType, 'id' | 'name'>;

export default class CategoriesStore {
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
