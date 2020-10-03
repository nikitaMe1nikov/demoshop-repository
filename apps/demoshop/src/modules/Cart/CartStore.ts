import { observable, computed, ObservableMap } from 'mobx';
import {
  injectStore,
  whenInit,
  whenReload,
  whenPayload,
  propOneOf,
  DirectorrStoreClass,
} from '@nimel/directorr';
import gql from 'graphql-tag';
import { NextHistoryStore, historyChange, HistoryChangeActionPayload } from '@nimel/directorr-next';
import { Product as ProductType, Order } from '@api/modules/gql.schema';
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
import { FETCH_POLICY } from 'sagas/constants';
import { GQLPayload } from 'sagas/types';
import { CART_URL, ROOT_URL } from 'config/url';
import { actionShowInfoSnack } from 'modules/Snackbar/decorators';
import i18n from 'config/i18n';
import { actionOpenModal } from 'modules/ModalBox/decorators';
import ProductDetailsModal from 'modules/Catalog/ProductDetailsModal';
import { actionSetSort, effectSetSort, effectSetCart, SortPayload } from './decorators';

enum ProductsSort {
  ALPHABET,
  PRICE_DSC,
}

export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    total
    price
    discount
    products {
      id
      name
      price
      amount
      favorite
      category {
        name
      }
    }
  }
`;

const CART_QUERY = gql`
  query {
    cart {
      ...OrderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productID: String!) {
    addToCart(productID: $productID) {
      ...OrderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($productID: String!) {
    removeFromCart(productID: $productID) {
      ...OrderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const DELETE_FROM_CART_MUTATION = gql`
  mutation DeleteFromCart($productID: String!) {
    deleteFromCart(productID: $productID) {
      ...OrderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const FILL_CART_MUTATION = gql`
  mutation FillCart {
    fillCart {
      ...OrderFragment
    }
    ${ORDER_FRAGMENT}
  }
`;

export type Product = Pick<
  ProductType,
  'id' | 'name' | 'price' | 'favorite' | 'amount' | 'category'
>;

function convertToId(product: Product) {
  return product.id;
}

export default class CartStore implements DirectorrStoreClass {
  @observable total?: number;
  @observable price?: number;
  @observable discount?: number;
  @observable.shallow productsMap = new Map() as ObservableMap<string, Product>;
  @observable.shallow isLoadingChange = new Map<string, null>();
  @observable.shallow isLoadingDeleting = new Map<string, null>();
  @observable isLoading = true;
  @observable isLoadingFill = true;
  @observable currentSort: ProductsSort = ProductsSort.ALPHABET;
  sortList = Object.keys(ProductsSort);

  @injectStore(NextHistoryStore) router: NextHistoryStore;

  @computed get sortProducts() {
    const products = [...this.productsMap.values()];

    if (this.currentSort === ProductsSort.PRICE_DSC) {
      return products.sort((a, b) => (a.price < b.price ? -1 : 0)).map(convertToId);
    }

    return products.map(convertToId);
  }

  @computed get isEmpty() {
    return !this.total;
  }

  @actionSetSort
  setCurrentSort = (sort: ProductsSort) => ({ sort });

  @effectSetSort
  toCurrentSort = ({ sort }: SortPayload) => {
    this.currentSort = sort;
  };

  @actionOpenModal
  showProductDetailsModal = (productID: string) => ({
    component: ProductDetailsModal,
    props: { productID },
  });

  @whenReload
  @actionGQLQuery
  getCart = () => ({ query: CART_QUERY, fetchPolicy: FETCH_POLICY.NETWORK_ONLY });

  @actionGQLMutation
  addToCart = (productID: string) => ({
    query: ADD_TO_CART_MUTATION,
    variables: { productID },
  });

  @actionGQLMutation
  removeFromCart = (productID: string) => ({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { productID },
  });

  @actionGQLMutation
  deleteFromCart = (productID: string) => ({
    query: DELETE_FROM_CART_MUTATION,
    variables: { productID },
  });

  @effectGQLQuerySuccess
  @effectGQLMutationSuccess
  @whenPayload({
    query: propOneOf([
      CART_QUERY,
      ADD_TO_CART_MUTATION,
      REMOVE_FROM_CART_MUTATION,
      DELETE_FROM_CART_MUTATION,
      FILL_CART_MUTATION,
    ]),
  })
  toChangeCart = ({
    data: { cart, addToCart, removeFromCart, deleteFromCart, fillCart },
  }: GQLPayload) => {
    const { total, price, discount, products }: Order =
      cart || addToCart || removeFromCart || deleteFromCart || fillCart;

    this.total = total;
    this.price = price;
    this.discount = discount;
    this.productsMap.replace(products.map((p) => [p.id, p]));
  };

  @effectSetCart
  setCart = ({ total, price, discount, products }: Order) => {
    this.total = total;
    this.price = price;
    this.discount = discount;
    this.productsMap.replace(products.map((p) => [p.id, p]));
  };

  @effectGQLMutationSuccess
  @whenPayload({ query: ADD_TO_CART_MUTATION })
  @actionShowInfoSnack
  whenAddedInCartCart = () => ({
    message: i18n.productAddedInCart,
  });

  @effectGQLMutationSuccess
  @whenPayload({ query: REMOVE_FROM_CART_MUTATION })
  @actionShowInfoSnack
  whenRemovedInCartCart = () => ({
    message: i18n.productRemovedFromCart,
  });

  @actionGQLMutation
  fillCart = () => ({
    query: FILL_CART_MUTATION,
  });

  @effectGQLMutationSuccess
  @whenPayload({ query: FILL_CART_MUTATION })
  toFillCart = () => {
    this.getCart();

    this.router.push(ROOT_URL);
  };

  @effectGQLMutationLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: FILL_CART_MUTATION })
  waitFillLoadingCart = ({ data, errors }: GQLPayload) => {
    this.isLoadingFill = !(data || errors);
  };

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({
    query: propOneOf([ADD_TO_CART_MUTATION, REMOVE_FROM_CART_MUTATION]),
  })
  waitProductChangeMutation = ({ data, errors, variables: { productID } }: GQLPayload) => {
    if (data || errors) {
      this.isLoadingChange.delete(productID);
    } else {
      this.isLoadingChange.set(productID, null);
    }
  };

  @effectGQLMutationLoading
  @effectGQLMutationSuccess
  @effectGQLMutationError
  @whenPayload({
    query: DELETE_FROM_CART_MUTATION,
  })
  waitProductDeletingMutation = ({ data, errors, variables: { productID } }: GQLPayload) => {
    if (data || errors) {
      this.isLoadingDeleting.delete(productID);
    } else {
      this.isLoadingDeleting.set(productID, null);
    }
  };

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: CART_QUERY })
  waitLoadingCart = ({ data, errors }: GQLPayload) => {
    this.isLoading = !(data || errors);
  };

  @whenInit
  protected toInit = () => {
    if (!this.isReady) this.getCart();
  };

  @historyChange(CART_URL)
  toRouteChange = ({ match }: HistoryChangeActionPayload) => {
    if (match) this.getCart();
  };

  get isReady() {
    return this.total !== undefined;
  }

  fromJSON({ total, price, discount, productsMap, isLoading }: CartStore) {
    this.total = total;
    this.price = price;
    this.discount = discount;
    this.productsMap.replace(productsMap);
    this.isLoading = isLoading;
  }
}
