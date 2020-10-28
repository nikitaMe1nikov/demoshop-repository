import { injectStore } from '@nimel/directorr';
import { historyChange, HistoryChangeActionPayload } from '@nimel/directorr-router';
import { actionRouterPush, generatePath } from '@nimel/directorr-router';
import { CATEGORIES_URL, CATEGORY_URL } from '@demo/url';
import { CategoriesStore, Category } from '@demo/categories-store';
export type { Category } from '@demo/categories-store';

export default class CategoriesScreenStore {
  @injectStore(CategoriesStore) categoriesStore: CategoriesStore;

  get categories() {
    return this.categoriesStore.categories;
  }

  get isLoading() {
    return this.categoriesStore.isLoading;
  }

  @actionRouterPush
  pushToCategory = (category: Category) => ({
    path: generatePath(CATEGORY_URL, { categoryID: category.id }),
  });

  @historyChange(CATEGORIES_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match) this.categoriesStore.getCategories();
  };
}
