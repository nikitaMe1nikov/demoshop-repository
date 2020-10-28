import { observable } from 'mobx';
import { whenOptions, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
import { Product as ProductType } from '@demo/gql-schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  effectGQLQueryError,
  GQLPayload,
} from '@demo/sagas';

const PRODUCT_DETAILS_QUERY = gql`
  query Product($productID: String!) {
    product(id: $productID) {
      id
      description
      favorite
      recomendations {
        id
        name
        price
        favorite
      }
    }
  }
`;

export type Product = Pick<ProductType, 'id' | 'name' | 'price' | 'favorite'>;

export class ProductDetailsStore {
  @observable description?: string;
  @observable recomendations?: Product[];
  @observable isLoading = true;

  @actionGQLQuery
  getProductDetails = (productID: string) => ({
    query: PRODUCT_DETAILS_QUERY,
    variables: { productID },
  });

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @effectGQLQueryError
  @whenPayload({ query: PRODUCT_DETAILS_QUERY })
  whenLoading = ({ data, errors }: GQLPayload) => {
    this.isLoading = !(data || errors);
  };

  @effectGQLQuerySuccess
  @whenPayload({ query: PRODUCT_DETAILS_QUERY })
  setCategories = ({
    data: {
      product: { description, recomendations },
    },
  }: GQLPayload) => {
    this.description = description;
    this.recomendations = recomendations;
  };

  @whenOptions
  toChangeOptions = ({ productID }) => {
    this.getProductDetails(productID);
  };
}
