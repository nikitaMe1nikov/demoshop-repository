import { injectStore } from '@nimel/directorr';
import { historyChange, HistoryChangeActionPayload } from '@nimel/directorr-router';
import { actionRouterPush, generatePath } from '@nimel/directorr-router';
import { CATEGORIES_URL, CATEGORY_URL } from '@frontend/url';
import { CategoriesStore } from '@frontend/categories-store';
import { CategoryModelType } from '@frontend/gql';

export default class CategoriesScreenStore {
  @injectStore(CategoriesStore) categoriesStore: CategoriesStore;

  get categories() {
    return this.categoriesStore.categories;
  }

  get isLoading() {
    return this.categoriesStore.isLoading;
  }

  @actionRouterPush
  pushToCategory = (category: CategoryModelType) => ({
    path: generatePath(CATEGORY_URL, { categoryID: category.id }),
  });

  @historyChange(CATEGORIES_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match) this.categoriesStore.getCategories();
  };
}
