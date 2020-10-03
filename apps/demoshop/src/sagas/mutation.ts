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
import {
  APOLLO_CLIENT_CONTEXT,
  APOLLO_CONTEXT,
  DEFAULT_ERROR_POLICY,
  WAIT_RESPONSE_TIMEOUT,
  MUTATE_QUERY,
  MUTATE_QUERY_SUCCESS,
  MUTATE_QUERY_ERROR,
  MUTATE_QUERY_LOADING,
} from './constants';
import { GQLPayload } from './types';

const { createAction } = config;

function* mutateQuery({ payload }: Action<string, GQLPayload>) {
  const apolloClient: ApolloClient<any> = yield getContext(APOLLO_CLIENT_CONTEXT);
  const context = yield getContext(APOLLO_CONTEXT);

  try {
    const { data, errors } = yield call(apolloClient.mutate, {
      ...payload,
      mutation: payload.query,
      context,
      errorPolicy: DEFAULT_ERROR_POLICY,
    });

    if (errors) {
      yield put(createAction(MUTATE_QUERY_ERROR, { ...payload, errors }));
    } else if (data) {
      yield put(createAction(MUTATE_QUERY_SUCCESS, { ...payload, data }));
    }
  } catch (error) {
    yield put(createAction(MUTATE_QUERY_ERROR, { ...payload, errors: [error] }));
  }
}

function* waitMutationChannel() {
  const channel = yield actionChannel(MUTATE_QUERY);

  while (true) {
    const { payload } = yield take(channel);

    yield delay(WAIT_RESPONSE_TIMEOUT);

    yield put(createAction(MUTATE_QUERY_LOADING, payload));
  }
}

function* getMutationLoading() {
  while (true) {
    yield race({
      wait: call(waitMutationChannel),
      success: take(MUTATE_QUERY_SUCCESS),
      error: take(MUTATE_QUERY_ERROR),
    });
  }
}

export default function* mutation() {
  yield takeEvery(MUTATE_QUERY, mutateQuery);
  yield fork(getMutationLoading);
}
