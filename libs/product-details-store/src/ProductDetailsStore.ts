import { observable } from 'mobx';
import { whenInit, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
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
    }
  }
`;

export class ProductDetailsStore {
  @observable description?: string;
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
  setCategories = ({ data: { product } }: GQLPayload) => {
    this.description = product.description;
  };

  @whenInit
  toInit = ({ productID }) => {
    this.getProductDetails(productID);
  };
}
