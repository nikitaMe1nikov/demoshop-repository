import { put, call, takeEvery, getContext } from 'redux-saga/effects';
import { config } from '@nimel/directorr';
import { ApolloClient } from 'apollo-client';
import { APOLLO_CLIENT_CONTEXT, RESET_CACHE, RESET_CACHE_SUCCESS } from './constants';

const { createAction } = config;

function* waitResetCache() {
  const apolloClient: ApolloClient<any> = yield getContext(APOLLO_CLIENT_CONTEXT);

  yield call(apolloClient.resetStore);

  yield put(createAction(RESET_CACHE_SUCCESS));
}

export default function* resetCache() {
  yield takeEvery(RESET_CACHE, waitResetCache);
}
