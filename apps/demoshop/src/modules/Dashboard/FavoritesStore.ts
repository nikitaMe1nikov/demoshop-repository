import { observable, computed, ObservableMap } from 'mobx';
import { whenInit, whenReload, whenPayload, propOneOf } from '@nimel/directorr';
import gql from 'graphql-tag';
import { Product as ProductType } from '@api/modules/gql.schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  actionGQLMutation,
} from 'sagas/decorators';
import { GQLPayload } from 'sagas/types';
import { FETCH_POLICY } from 'sagas/constants';
import { PRODUCT_FRAGMENT } from 'modules/Catalog/CatalogStore';
import { actionOpenModal } from 'modules/ModalBox/decorators';
import ProductDetailsModal from 'modules/Catalog/ProductDetailsModal';

const FAVORITES_PRODUCTS_QUERY = gql`
  query {
    me {
      id
      favorites {
        ...ProductFragment
      }
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

type Product = Pick<ProductType, 'id' | 'name' | 'price' | 'favorite'>;

export default class FavoritesStore {
  @observable.shallow productsMap = new Map() as ObservableMap<string, Product>;
  @computed get products() {
    return [...this.productsMap.keys()];
  }
  @observable.shallow isLoadingFavorites = new Map<string, null>();
  @observable isLoading = true;
  isReady = false;

  @actionOpenModal
  showProductDetailsModal = (productID: string) => ({
    component: ProductDetailsModal,
    props: { productID },
  });

  @whenReload
  @actionGQLQuery
  getFavoritesProducts = () => ({
    query: FAVORITES_PRODUCTS_QUERY,
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: FAVORITES_PRODUCTS_QUERY })
  setLoading = ({ data, errors }: GQLPayload) => {
    this.isLoading = !(data || errors);
  };

  @effectGQLQuerySuccess
  @whenPayload({ query: FAVORITES_PRODUCTS_QUERY })
  setProducts = ({
    data: {
      me: { favorites },
    },
  }: GQLPayload) => {
    this.productsMap.merge(favorites.map((p) => [p.id, p]));
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

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
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

  @effectGQLQuerySuccess
  @whenPayload({
    query: propOneOf([ADD_FAVORITE_PRODUCT_MUTATION, REMOVE_FAVORITE_PRODUCT_MUTATION]),
  })
  changeFavoriteProduct = ({ data: { addFavorite, removeFavorite } }: GQLPayload) => {
    this.isReady = true;
    const product = addFavorite || removeFavorite;

    this.productsMap.set(product.id, product);
  };

  @whenInit
  toInit = () => {
    if (!this.isReady) this.getFavoritesProducts();
  };

  fromJSON({ productsMap, isLoading }: FavoritesStore) {
    this.productsMap.replace(productsMap);
    this.isLoading = isLoading;
  }
}
