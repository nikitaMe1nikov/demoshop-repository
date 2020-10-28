import { observable } from 'mobx';
import { whenInit, whenReload, whenPayload } from '@nimel/directorr';
import gql from 'graphql-tag';
import { Category as CategoryType } from '@demo/gql-schema';
import {
  actionGQLQuery,
  effectGQLQuerySuccess,
  effectGQLQueryLoading,
  GQLPayload,
} from '@demo/sagas';

const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export type Category = Pick<CategoryType, 'id' | 'name'>;

export class CategoriesStore {
  @observable.ref categories?: Category[];
  @observable isLoading = true;

  @whenReload
  @actionGQLQuery
  getCategories = () => ({ query: CATEGORIES_QUERY });

  @effectGQLQuerySuccess
  @whenPayload({ query: CATEGORIES_QUERY })
  setCategories = ({ data: { categories } }: GQLPayload) => {
    this.categories = categories;
  };

  @effectGQLQueryLoading
  @effectGQLQuerySuccess
  @whenPayload({ query: CATEGORIES_QUERY })
  changeLoading = ({ data }: GQLPayload) => {
    this.isLoading = !data;
  };

  @whenInit
  toInit = () => {
    if (!this.isReady) this.getCategories();
  };

  get isReady() {
    return !!this.categories;
  }
}
