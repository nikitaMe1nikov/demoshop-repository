import { observable, computed } from 'mobx';
import { whenInit, whenReload, injectStore } from '@nimel/directorr';
import { RootStore, RootStoreType, ProductModelType, selectFromProduct } from '@demo/mst-gql';
import {
  actionSetFavoritesProducts,
  effectSetFavoritesProducts,
  ProductsPayload,
} from './decorators';

const PRODUCT_QUERY = selectFromProduct().name.price.favorite.toString();

export class FavoritesStore {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.ref products?: ProductModelType[];

  @computed get isLoading() {
    return !this.products;
  }

  @whenInit
  @whenReload
  getProducts = () => {
    const { data, promise } = this.rootStore.qFavoritesProducts({}, PRODUCT_QUERY);

    if (data?.favorites) {
      this.whenHaveProducts(data);
    } else {
      promise.tap(this.whenHaveProducts);
    }
  };

  @actionSetFavoritesProducts
  whenHaveProducts = ({ favorites }: { favorites: ProductModelType[] }) => ({
    products: favorites,
  });

  @effectSetFavoritesProducts
  setProducts = ({ products }: ProductsPayload) => {
    this.products = [...products];
  };

  toJSON() {}
}
