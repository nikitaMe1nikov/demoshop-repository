import { observable } from 'mobx';
import { whenInit, whenPayload, injectStore } from '@nimel/directorr';
import {
  actionRouterIsPattern,
  effectRouterIsPatternSuccess,
  RouterIsPatternSuccessActionPayload,
  historyChange,
  HistoryChangeActionPayload,
} from '@nimel/directorr-router';
import { CATEGORY_URL } from '@demo/url';
import { CategoriesStore } from '@demo/categories-store';
export type { Category } from '@demo/categories-store';

export default class CategoryPanel {
  @injectStore(CategoriesStore) categoriesStore: CategoriesStore;
  // @observable.ref categories?: Category[];
  @observable currentCategoryID?: string;
  // @observable isLoading = false;

  get categories() {
    return this.categoriesStore.categories;
  }

  get isLoading() {
    return this.categoriesStore.isLoading;
  }

  @whenInit
  @actionRouterIsPattern
  toInit = () => ({ pattern: CATEGORY_URL });

  @effectRouterIsPatternSuccess
  @whenPayload({
    pattern: CATEGORY_URL,
  })
  matchPattern = ({ queryObject }: RouterIsPatternSuccessActionPayload) => {
    this.currentCategoryID = queryObject.categoryID as string;
  };

  // @effect(actionHistoryPop.type)
  // toRouteChange = ({ queryObject, pattern }) => {
  //   console.log('queryObject, pattern', queryObject, pattern);
  //   // this.currentCategoryID = pattern === CATEGORY_URL ? queryObject.categoryID : undefined;
  // };

  @historyChange(CATEGORY_URL)
  toRouteChange = ({ match, queryObject }: HistoryChangeActionPayload) => {
    // console.log('queryObject, pattern', match, queryObject);
    this.currentCategoryID = match ? (queryObject.categoryID as string) : undefined;
  };

  // get isReady() {
  //   return !!this.categories;
  // }
}
