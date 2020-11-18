import { observable, computed } from 'mobx';
import {
  whenInit,
  whenReload,
  whenPayload,
  injectStore,
  DirectorrStoreClass,
} from '@nimel/directorr';
import {
  actionRouterIsPattern,
  effectRouterIsPatternSuccess,
  RouterIsPatternSuccessActionPayload,
  historyChange,
  HistoryChangeActionPayload,
} from '@nimel/directorr-router';
import { CATEGORY_URL } from '@demo/url';
import {
  RootStore,
  RootStoreType,
  ProductModelType,
  CategoryModelType,
  ProductsSort,
  selectFromProducts,
  selectFromCategory,
  selectFromProduct,
  Variables,
} from '@demo/mst-gql';
import {
  actionSetSort,
  effectSetSort,
  actionLoadMore,
  effectLoadMore,
  actionSetPage,
  effectSetPage,
  SortPayload,
  PagePayload,
  actionUpdateProducts,
  effectUpdateProduct,
  actionSetProducts,
  effectSetProducts,
  ProductsPayload,
  actionSetCategory,
  effectSetCategory,
  CategoryPayload,
} from './decorators';

const DEFAULT_VARIABLES = { first: 40 };

const PRODUCTS_QUERY = selectFromProducts()
  .total.endCursor.hasNextPage.nodes((product) => product.name.price.favorite)
  .toString();

const CATEGORY_QUERY = selectFromCategory().name.toString();

const PRODUCT_QUERY = selectFromProduct()
  .name.price.favorite.description.recomendations((product) => product.name.price.favorite)
  .toString();

export class CatalogStore implements DirectorrStoreClass {
  @injectStore(RootStore) rootStore: RootStoreType;
  @observable.shallow products?: ProductModelType[];
  @observable currentCategory?: CategoryModelType;
  @observable productsTotal = 0;
  hasNextPage = true;
  endCursor = 0;
  @observable isUpdating = false;
  @computed get isLoading() {
    return !this.products;
  }
  @observable currentSort: ProductsSort = ProductsSort.PriceASC;
  sortList = Object.keys(ProductsSort);
  @computed get pageCount() {
    return Math.ceil(this.productsTotal / DEFAULT_VARIABLES.first);
  }
  @observable currentPage = 1;
  @observable categoryID: string;

  @actionSetSort
  setCurrentSort = (sort: ProductsSort) => ({ sort });

  @effectSetSort
  toSetCurrentSort = ({ sort }: SortPayload) => {
    this.currentSort = sort;
    this.products = undefined;
    this.getProducts();
  };

  @actionSetPage
  setCurrentPage = (page: number) => ({ page });

  @effectSetPage
  toCurrentPage = ({ page }: PagePayload) => {
    this.currentPage = page;
  };

  @actionLoadMore
  loadMore = () => {};

  @effectLoadMore
  toLoadMore = () => {
    if (this.hasNextPage && !this.isLoading)
      this.getProducts({
        after: this.endCursor,
      });
  };

  @actionUpdateProducts
  updateList = () => {};

  @effectUpdateProduct
  toUpdateList = () => {
    this.isUpdating = true;

    this.getProducts();
  };

  getProduct = (id: string) => {
    this.rootStore.qProduct({ id }, PRODUCT_QUERY);
  };

  getProducts = (variables?: Variables) => {
    const { data, promise } = this.rootStore.qProducts(
      { ...DEFAULT_VARIABLES, sort: this.currentSort, categoryId: this.categoryID, ...variables },
      PRODUCTS_QUERY
    );

    if (data?.products) {
      this.whenHaveProducts(data);
    } else {
      promise.tap(this.whenHaveProducts).finally(this.doneLoading);
    }
  };

  @actionSetProducts
  whenHaveProducts = ({ products }: ProductsPayload) => ({ products });

  @effectSetProducts
  setProducts = ({ products: { total, endCursor, hasNextPage, nodes } }: ProductsPayload) => {
    this.productsTotal = total || 0;
    this.endCursor = endCursor || 0;
    this.hasNextPage = hasNextPage || false;

    if (this.products) {
      this.products.push(...nodes);
    } else {
      this.products = [...nodes];
    }
  };

  doneLoading = () => {
    this.isUpdating = false;
  };

  getCategory = () => {
    const { data, promise } = this.rootStore.qCategory({ id: this.categoryID }, CATEGORY_QUERY);

    if (data?.category) this.whenHaveCategory(data);

    promise.tap(this.whenHaveCategory);
  };

  @actionSetCategory
  whenHaveCategory = ({ category }: CategoryPayload) => ({ category });

  @effectSetCategory
  setCategory = ({ category }: CategoryPayload) => {
    this.currentCategory = category;
  };

  @whenInit
  @actionRouterIsPattern
  toInit = () => ({ pattern: CATEGORY_URL });

  @effectRouterIsPatternSuccess
  @whenPayload({
    pattern: CATEGORY_URL,
  })
  matchPattern = ({ queryObject }: RouterIsPatternSuccessActionPayload) => {
    if (queryObject.categoryID) this.categoryID = queryObject.categoryID as string;
    this.products = undefined;
    this.getProducts();
    this.getCategory();
  };

  @whenReload
  toReload = () => {
    this.products = undefined;
    this.getProducts();
  };

  @historyChange(CATEGORY_URL)
  toRouteChange = ({ match, queryObject }: HistoryChangeActionPayload) => {
    if (match) {
      this.categoryID = queryObject?.categoryID as string;

      this.products = undefined;
      this.currentCategory = undefined;
      this.getProducts();
      this.getCategory();
    }
  };

  get isReady() {
    return !!this.products && !!this.currentCategory;
  }

  toJSON() {}
}
