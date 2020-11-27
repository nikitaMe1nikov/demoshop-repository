import { observable, computed } from 'mobx';
import { whenInit, whenReload, injectStore } from '@nimel/directorr';
import { RootStore, RootStoreType, CategoryModelType, selectFromCategory } from '@frontend/gql';
import { actionSetCategories, effectSetCategories, CategoriesPayload } from './decorators';

const CATEGORIES_QUERY = selectFromCategory().name.toString();

export class CategoriesStore {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.ref categories?: CategoryModelType[];

  @computed get isLoading() {
    return !this.categories;
  }

  @whenInit
  @whenReload
  getCategories = () => {
    const { data, promise } = this.rootStore.qCategories({}, CATEGORIES_QUERY);

    if (data?.categories) {
      this.whenHaveCategories(data);
    } else {
      promise.tap(this.whenHaveCategories);
    }
  };

  @actionSetCategories
  whenHaveCategories = ({ categories }: CategoriesPayload) => ({ categories });

  @effectSetCategories
  setCategories = ({ categories }: CategoriesPayload) => {
    this.categories = categories;
  };

  get isReady() {
    return !!this.categories;
  }

  toJSON() {}
}
