import { observable, computed } from 'mobx';
import {
  whenInit,
  whenPayload,
  injectStore,
  createActionAndEffect,
  whenReload,
} from '@nimel/directorr';
import {
  actionRouterIsPattern,
  effectRouterIsPatternSuccess,
  RouterIsPatternSuccessActionPayload,
  historyChange,
  HistoryChangeActionPayload,
} from '@nimel/directorr-router';
import { CATEGORY_URL } from '@frontend/url';
import { RootStore, RootStoreType, CategoryModelType, selectFromCategory } from '@frontend/gql';
export type { CategoryModelType } from '@frontend/gql';

export interface CategoriesPayload {
  categories: CategoryModelType[];
}

export const [actionSetCategories, effectSetCategories] = createActionAndEffect<CategoriesPayload>(
  'CategoryPanelStore.setCategories'
);

const CATEGORIES_QUERY = selectFromCategory().name.toString();

export default class CategoryPanelStore {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.ref categories?: CategoryModelType[];
  @observable currentCategoryID?: string;

  @computed get isLoading() {
    return !!this.categories;
  }

  @whenReload
  getCategories = () => {
    const { data, promise } = this.rootStore.qCategories({}, CATEGORIES_QUERY);

    if (data?.categories) this.whenHaveCategories(data);

    promise.tap(this.whenHaveCategories);
  };

  @actionSetCategories
  whenHaveCategories = ({ categories }: CategoriesPayload) => ({ categories });

  @effectSetCategories
  setCategories = ({ categories }: CategoriesPayload) => {
    this.categories = categories;
  };

  @whenInit
  @actionRouterIsPattern
  toInit = () => {
    this.getCategories();

    return { pattern: CATEGORY_URL };
  };

  @effectRouterIsPatternSuccess
  @whenPayload({
    pattern: CATEGORY_URL,
  })
  matchPattern = ({ queryObject }: RouterIsPatternSuccessActionPayload) => {
    this.currentCategoryID = queryObject.categoryID as string;
  };

  @historyChange(CATEGORY_URL)
  toRouteChange = ({ match, queryObject }: HistoryChangeActionPayload) => {
    this.currentCategoryID = match ? (queryObject.categoryID as string) : undefined;
  };

  toJSON() {}
}
