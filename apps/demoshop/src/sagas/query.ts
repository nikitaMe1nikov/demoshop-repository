import {
  put,
  call,
  take,
  takeEvery,
  getContext,
  delay,
  fork,
  race,
  actionChannel,
} from 'redux-saga/effects';
import { config, Action } from '@nimel/directorr';
import { ApolloClient } from 'apollo-client';
import { isServer } from 'config/env';
import {
  APOLLO_CLIENT_CONTEXT,
  APOLLO_CONTEXT,
  DEFAULT_ERROR_POLICY,
  FETCH_POLICY,
  WAIT_RESPONSE_TIMEOUT,
  GET_QUERY,
  GET_QUERY_SUCCESS,
  GET_QUERY_ERROR,
  GET_QUERY_LOADING,
} from './constants';
import { GQLPayload } from './types';

const { createAction } = config;

function* getQuery({ payload }: Action<string, GQLPayload>) {
  const apolloClient: ApolloClient<any> = yield getContext(APOLLO_CLIENT_CONTEXT);
  const context = yield getContext(APOLLO_CONTEXT);

  try {
    const { data, errors } = yield call(apolloClient.query, {
      ...payload,
      context,
      errorPolicy: DEFAULT_ERROR_POLICY,
      ...(isServer && { fetchPolicy: FETCH_POLICY.NOCACHE as any }),
    });

    if (errors) {
      yield put(createAction(GET_QUERY_ERROR, { ...payload, errors }));
    } else if (data) {
      yield put(createAction(GET_QUERY_SUCCESS, { ...payload, data }));
    }
  } catch (error) {
    yield put(createAction(GET_QUERY_ERROR, { ...payload, errors: [error] }));
  }
}

function* waitQueryChannel() {
  const channel = yield actionChannel(GET_QUERY);

  while (true) {
    const { payload } = yield take(channel);

    yield delay(WAIT_RESPONSE_TIMEOUT);

    yield put(createAction(GET_QUERY_LOADING, payload));
  }
}

function* getQueryLoading() {
  while (true) {
    yield race({
      wait: call(waitQueryChannel),
      success: take(GET_QUERY_SUCCESS),
      error: take(GET_QUERY_ERROR),
    });
  }
}

export default function* query() {
  yield takeEvery(GET_QUERY, getQuery);
  yield fork(getQueryLoading);
}
