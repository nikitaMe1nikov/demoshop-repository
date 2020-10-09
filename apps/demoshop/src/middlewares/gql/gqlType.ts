import { effect, whenPayload, CreateDecorator, composePropertyDecorators } from '@nimel/directorr';
import { GQL_FLAT_DATA, GQL_SET_STORE_TYPE } from './gqlMiddleware';

const gql: CreateDecorator<string, string> = (typename: string, prop?: string) =>
  composePropertyDecorators([
    effect(GQL_SET_STORE_TYPE),
    whenPayload(
      (payload) => !!payload.get(typename),
      (payload: GQL_FLAT_DATA) => (prop ? payload.get(typename)[prop] : payload.get(typename))
    ),
  ]);

export default gql;
