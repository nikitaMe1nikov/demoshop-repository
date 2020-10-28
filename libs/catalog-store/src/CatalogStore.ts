import { observable, computed, ObservableMap } from 'mobx';
import { OperationVariables } from 'apollo-client';
import {
  whenInit,
  whenReload,
  propOneOf,
  whenPayload,
  DirectorrStoreClass,
} from '@nimel/directorr';
import {
  actionRouterIsPattern,
  effectRouterIsPatternSuccess,
  RouterIsPatternSuccessActionPayload,
  historyChange,
  HistoryChangeActionPayload,
} from '@nimel/directorr-router';
import gql from 'graphql-tag';
import { Product as ProductType, Category as CategoryType, ProductsSort } from '@demo/gql-schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  actionGQLMutation,
  effectGQLMutationSuccess,
  effectGQLMutationLoading,
  effectGQLMutationError,
  GQLPayload,
} from '@demo/sagas';
import { CATEGORY_URL } from '@demo/url';
import i18n from '@demo/i18n';
import { actionShowInfoSnack } from '@demo/snackbar';
import { actionOpenModal, ModalBoxPayload } from '@demo/modal-box';
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
} from './decorators';

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

const PRODUCT_DETAILS_QUERY = gql`
  query Product($productID: String!) {
    product(id: $productID) {
      ...ProductFragment
      description
      recomendations {
        ...ProductFragment
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export type Product = Pick<
  ProductType,
  'id' | 'name' | 'price' | 'favorite' | 'description' | 'recomendations'
>;
export type Category = Pick<CategoryType, 'name'>;

export class CatalogStore implements DirectorrStoreClass {
  @observable.shallow productsMap = new Map() as ObservableMap<string, Product>;
  @computed get products() {
    return [...this.productsMap.keys()];
  }
  @observable currentCategory?: Category;
  @observable productsTotal?: number;
  @observable hasNextPage?: boolean;
  @observable isUpdating = false;
  @observable isLoading = true;
  @observable isLoadingDetails = true;
  @observable isError = false;
  @observable.shallow isLoadingFavorites = new Map<string, null>();
  @observable currentSort: ProductsSort = ProductsSort.PriceASC;
  sortList = Object.keys(ProductsSort);
  @computed get pageCount() {
    return Math.ceil(this.productsTotal / DEFAULT_VARIABLES.first);
  }
  @observable currentPage = 1;
  @observable categoryID = '';

  @actionSetSort
  setCurrentSort = (sort: ProductsSort) => ({ sort });

  @effectSetSort
  toSetCurrentSort = ({ sort }: SortPayload) => {
    this.currentSort = sort;
    this.getProducts({ categoryID: this.categoryID, sort });
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
        categoryID: this.categoryID,
      });
  };

  @actionUpdateProducts
  updateList = () => {};

  @effectUpdateProduct
  toUpdateList = () => {
    this.getProducts({
      categoryID: this.categoryID,
      update: true,
    });
  };

  @actionGQLQuery
  getProduct = (productID: string) => ({
    query: PRODUCT_DETAILS_QUERY,
    variables: { productID },
  });

  @actionGQLQuery
  getProducts = (variables: OperationVariables) => ({
    query: PRODUCTS_QUERY,
    variables: { ...DEFAULT_VARIABLES, sort: this.currentSort, ...variables },
  });

  @actionOpenModal
  showProductDetailsModal = <P>(component: ModalBoxPayload<P>['component'], props: P) => ({
    component,
    props,
  });

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: PRODUCTS_QUERY })
  setProductsLoading = ({ data, errors, variables: { after, update } }: GQLPayload) => {
    if (data || errors) {
      this.isLoading = false;
      this.isUpdating = false;
    } else if (!after) {
      this.isLoading = true;
    } else if (update) {
      this.isUpdating = true;
    }
  };

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: PRODUCT_DETAILS_QUERY })
  setProductLoading = ({ data, errors }: GQLPayload) => {
    this.isLoadingDetails = !(data || errors);
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
    variables: { categoryID, reset, update },
  }: GQLPayload) => {
    if (reset || update) this.productsMap.clear();

    if (categoryID === this.categoryID) {
      this.productsMap.merge(nodes.map((p) => [p.id, p]));
      this.productsTotal = total;
      this.currentCategory = category;
      this.hasNextPage = hasNextPage;
    }
  };

  @effectGQLQuerySuccess
  @whenPayload({ query: PRODUCT_DETAILS_QUERY })
  setProduct = ({ data: { product } }: GQLPayload) => {
    this.productsMap.merge([[product.id, product]]);
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
  @actionRouterIsPattern
  toInit = () => ({ pattern: CATEGORY_URL });

  @effectRouterIsPatternSuccess
  @whenPayload({
    pattern: CATEGORY_URL,
  })
  matchPattern = ({ queryObject }: RouterIsPatternSuccessActionPayload) => {
    if (queryObject.categoryID) this.categoryID = queryObject.categoryID as string;
  };

  @whenReload
  toReload = () => {
    this.getProducts({ categoryID: this.categoryID, reset: true });
  };

  @historyChange(CATEGORY_URL)
  toRouteChange = ({ match, queryObject }: HistoryChangeActionPayload) => {
    if (match) {
      this.categoryID = queryObject.categoryID as string;

      this.getProducts({ categoryID: this.categoryID, reset: true });
    }
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
