import { Action, Next, DirectorrInterface, config } from '@nimel/directorr';

export const GQL_SET_STORE_TYPE = 'GQL.SET_STORE';

interface GQLData {
  __typename: string;
  [key: string]: any | GQLData;
}

export type GQL_FLAT_DATA = Map<string, object>;

const OBJECT_STRING = '[object Object]';

function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === OBJECT_STRING;
}

function createGQLMap(
  data: GQLData,
  flatData = new Map<string, Array<Record<string, any>>>()
): GQL_FLAT_DATA {
  const typename = data.__typename;

  for (const prop in data) {
    const v = data[prop];

    if (isObject(v)) {
      createGQLMap(v, flatData);
    }

    if (Array.isArray(v)) {
      for (let i = 0, l = v.length; i < l; ++i) {
        createGQLMap(v[i], flatData);
      }
    }
  }

  if (typename) {
    if (flatData.has(typename)) {
      flatData.get(typename).push(data);
    } else {
      flatData.set(typename, [data]);
    }
  }

  return flatData;
}

export default (actionTypes: string[]) => (
  action: Action,
  next: Next,
  store: DirectorrInterface
) => {
  if (actionTypes.includes(action.type)) {
    const { data } = action.payload;

    store.dispatch(config.createAction(GQL_SET_STORE_TYPE, createGQLMap(data)));
  }

  next(action);
};
