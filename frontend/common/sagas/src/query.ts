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
import { isServer } from '@frontend/env';
import {
  APOLLO_CLIENT_CONTEXT,
  APOLLO_CONTEXT,
  DEFAULT_ERROR_POLICY,
  FETCH_POLICY,
  WAIT_RESPONSE_TIMEOUT,
} from './constants';
import {
  actionGQLQuery,
  actionGQLQuerySuccess,
  actionGQLQueryLoading,
  actionGQLQueryError,
} from './decorators';
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
      yield put(createAction(actionGQLQueryError.type, { ...payload, errors }));
    } else if (data) {
      yield put(createAction(actionGQLQuerySuccess.type, { ...payload, data }));
    }
  } catch (error) {
    yield put(createAction(actionGQLQueryError.type, { ...payload, errors: [error] }));
  }
}

function* waitQueryChannel() {
  const channel = yield actionChannel(actionGQLQuery.type);

  while (true) {
    const { payload } = yield take(channel);

    if (payload.fetchPolicy !== FETCH_POLICY.NETWORK_ONLY) {
      yield delay(WAIT_RESPONSE_TIMEOUT);
    }

    yield put(createAction(actionGQLQueryLoading.type, payload));
  }
}

function* getQueryLoading() {
  while (true) {
    yield race({
      wait: call(waitQueryChannel),
      success: take(actionGQLQuerySuccess.type),
      error: take(actionGQLQueryError.type),
    });
  }
}

export function* query() {
  yield takeEvery(actionGQLQuery.type, getQuery);
  yield fork(getQueryLoading);
}
