import { actionRouterPush } from '@nimel/directorr-router';
import { USER_URL } from '@demo/url';
// export type { Category } from '@demo/categories-store';

export default class OrdersScreenStore {
  // @injectStore(CategoriesStore) categoriesStore: CategoriesStore;

  // get categories() {
  //   return this.categoriesStore.categories;
  // }

  // get isLoading() {
  //   return this.categoriesStore.isLoading;
  // }

  @actionRouterPush
  pushToProfile = () => ({
    path: USER_URL,
  });

  // @historyChange(CATEGORIES_URL)
  // toRouteChange = ({ match }: HistoryChangeActionPayload) => {
  //   if (match) this.categoriesStore.getCategories();
  // };
}
