import { put, call, takeEvery, getContext } from 'redux-saga/effects';
import { config } from '@nimel/directorr';
import { ApolloClient } from 'apollo-client';
import { APOLLO_CLIENT_CONTEXT } from './constants';
import { actionGQLResetCache, actionGQLResetCacheSuccess } from './decorators';

const { createAction } = config;

function* waitResetCache() {
  const apolloClient: ApolloClient<any> = yield getContext(APOLLO_CLIENT_CONTEXT);

  yield call(apolloClient.resetStore);

  yield put(createAction(actionGQLResetCacheSuccess.type));
}

export function* resetCache() {
  yield takeEvery(actionGQLResetCache.type, waitResetCache);
}
