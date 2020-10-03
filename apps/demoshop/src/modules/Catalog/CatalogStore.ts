import { observable, computed, ObservableMap } from 'mobx';
import { OperationVariables } from 'apollo-client';
import {
  injectStore,
  whenInit,
  whenReload,
  propOneOf,
  whenPayload,
  DirectorrStoreClass,
  createActionAndEffect,
} from '@nimel/directorr';
import { NextHistoryStore, historyChange, HistoryChangeActionPayload } from '@nimel/directorr-next';
import gql from 'graphql-tag';
import {
  Product as ProductType,
  Category as CategoryType,
  ProductsSort,
} from '@api/modules/gql.schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  actionGQLMutation,
  effectGQLMutationSuccess,
  effectGQLMutationLoading,
  effectGQLMutationError,
} from 'sagas/decorators';
import { GQLPayload } from 'sagas/types';
import { CATEGORY_URL } from 'config/url';
import i18n from 'config/i18n';
import { actionShowInfoSnack } from 'modules/Snackbar/decorators';
import { actionOpenModal } from 'modules/ModalBox/decorators';
import ProductDetailsModal from './ProductDetailsModal';

const DEFAULT_VARIABLES = { first: 40 };

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    price
    favorite
  }
`;

const PRODUCTS_QUERY = gql`
  query Products($categoryID: String!, $sort: ProductsSort, $first: Int, $after: Int) {
    products(categoryID: $categoryID, sort: $sort, first: $first, after: $after) {
      total
      hasNextPage
      nodes {
        ...ProductFragment
      }
    }
    category(id: $categoryID) {
      name
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const ADD_FAVORITE_PRODUCT_MUTATION = gql`
  mutation AddFavoriteProduct($productID: String!) {
    addFavorite(id: $productID) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const REMOVE_FAVORITE_PRODUCT_MUTATION = gql`
  mutation RemoveFavoriteProduct($productID: String!) {
    removeFavorite(id: $productID) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

interface SortPayload {
  sort: ProductsSort;
}

interface PagePayload {
  page: number;
}

export const [actionSetSort, effectSetSort] = createActionAndEffect<SortPayload>(
  'PRODUCTS.SET_CURRENT_SORT'
);
export const [actionLoadMore, effectLoadMore] = createActionAndEffect<void>(
  'PRODUCTS.LOAD_MORE_PRODUCTS'
);
export const [actionSetPage, effectSetPage] = createActionAndEffect<PagePayload>(
  'PRODUCTS.SET_PAGE_PRODUCTS'
);

export type Product = Pick<ProductType, 'id' | 'name' | 'price' | 'favorite'>;
export type Category = Pick<CategoryType, 'name'>;

export default class CatalogStore implements DirectorrStoreClass {
  @observable.shallow productsMap = new Map() as ObservableMap<string, Product>;
  @computed get products() {
    return [...this.productsMap.keys()];
  }
  @observable currentCategory?: Category;
  @observable productsTotal?: number;
  @observable hasNextPage?: boolean;
  @observable isLoading = true;
  @observable isError = false;
  @observable.shallow isLoadingFavorites = new Map<string, null>();
  @observable currentSort: ProductsSort = ProductsSort.PriceASC;
  sortList = Object.keys(ProductsSort);
  @computed get pageCount() {
    return Math.ceil(this.productsTotal / DEFAULT_VARIABLES.first);
  }
  @observable currentPage = 1;

  @injectStore(NextHistoryStore) router: NextHistoryStore;

  @actionSetSort
  setCurrentSort = (sort: ProductsSort) => ({ sort });

  @effectSetSort
  toSetCurrentSort = ({ sort }: SortPayload) => {
    this.currentSort = sort;
    this.getProducts({ ...this.router.queryObject, sort });
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
    if (this.hasNextPage)
      this.getProducts({
        after: this.products.length,
        ...this.router.queryObject,
      });
  };

  @actionGQLQuery
  getProducts = (variables: OperationVariables) => ({
    query: PRODUCTS_QUERY,
    variables: { ...DEFAULT_VARIABLES, sort: this.currentSort, ...variables },
  });

  @actionOpenModal
  showProductDetailsModal = (productID: string) => ({
    component: ProductDetailsModal,
    props: { productID },
  });

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: PRODUCTS_QUERY })
  setProductsLoading = ({ data, errors, variables: { after } }: GQLPayload) => {
    if (data || errors) {
      this.isLoading = false;
    } else if (!after) {
      this.isLoading = true;
    }
  };

  @effectGQLQueryError
  @whenPayload({ query: PRODUCTS_QUERY })
  whenError = () => {
    this.isError = true;
  };

  @effectGQLQuerySuccess
  @whenPayload({ query: PRODUCTS_QUERY })
  setProducts = ({
    data: {
      products: { nodes, total, hasNextPage },
      category,
    },
    variables: { categoryID, reset },
  }: GQLPayload) => {
    if (reset) this.productsMap.clear();

    if (categoryID === this.router.queryObject.categoryID) {
      this.productsMap.merge(nodes.map((p) => [p.id, p]));
      this.productsTotal = total;
      this.currentCategory = category;
      this.hasNextPage = hasNextPage;
    }
  };

  @actionGQLMutation
  addFavorite = (productID: string) => ({
    query: ADD_FAVORITE_PRODUCT_MUTATION,
    variables: { productID },
  });

  @actionGQLMutation
  removeFavorite = (productID: string) => ({
    query: REMOVE_FAVORITE_PRODUCT_MUTATION,
    variables: { productID },
  });

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({
    query: propOneOf([ADD_FAVORITE_PRODUCT_MUTATION, REMOVE_FAVORITE_PRODUCT_MUTATION]),
  })
  setFavoriteProductLoading = ({ data, errors, variables: { productID } }: GQLPayload) => {
    if (data || errors) {
      this.isLoadingFavorites.delete(productID);
    } else {
      this.isLoadingFavorites.set(productID, null);
    }
  };

  @effectGQLMutationSuccess
  @whenPayload({
    query: propOneOf([ADD_FAVORITE_PRODUCT_MUTATION, REMOVE_FAVORITE_PRODUCT_MUTATION]),
  })
  changeFavoriteProduct = ({ data: { addFavorite, removeFavorite } }: GQLPayload) => {
    const product = addFavorite || removeFavorite;

    this.productsMap.set(product.id, product);
  };

  @effectGQLMutationSuccess
  @whenPayload({ query: ADD_FAVORITE_PRODUCT_MUTATION })
  @actionShowInfoSnack
  whenAddedInFavorite = () => ({ message: i18n.productAddedInFavorite });

  @effectGQLMutationSuccess
  @whenPayload({ query: REMOVE_FAVORITE_PRODUCT_MUTATION })
  @actionShowInfoSnack
  whenRemoveFromFavorite = () => ({ message: i18n.productRemovedFromFavorite });

  @whenInit
  toInit = () => {
    if (!this.isReady && this.router.isCurrentPattern(CATEGORY_URL)) {
      this.getProducts({ ...this.router.queryObject });
    }
  };

  @whenReload
  toReload = () => {
    this.getProducts({ ...this.router.queryObject, reset: true });
  };

  @historyChange(CATEGORY_URL)
  toRouteChange = ({ match, queryObject }: HistoryChangeActionPayload) => {
    if (match) this.getProducts({ ...queryObject, reset: true });
  };

  get isReady() {
    return !!this.currentCategory;
  }

  fromJSON({
    productsMap,
    currentCategory,
    productsTotal,
    hasNextPage,
    currentSort,
    isLoading,
  }: CatalogStore) {
    this.productsMap.replace(productsMap);
    this.currentCategory = currentCategory;
    this.productsTotal = productsTotal;
    this.hasNextPage = hasNextPage;
    this.currentSort = currentSort;
    this.isLoading = isLoading;
  }
}
