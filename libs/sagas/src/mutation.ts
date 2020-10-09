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
} from './constants';
import {
  actionGQLMutation,
  actionGQLMutationSuccess,
  actionGQLMutationLoading,
  actionGQLMutationError,
} from './decorators';
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
      yield put(createAction(actionGQLMutationError.type, { ...payload, errors }));
    } else if (data) {
      yield put(createAction(actionGQLMutationSuccess.type, { ...payload, data }));
    }
  } catch (error) {
    yield put(createAction(actionGQLMutationError.type, { ...payload, errors: [error] }));
  }
}

function* waitMutationChannel() {
  const channel = yield actionChannel(actionGQLMutation.type);

  while (true) {
    const { payload } = yield take(channel);

    yield delay(WAIT_RESPONSE_TIMEOUT);

    yield put(createAction(actionGQLMutationLoading.type, payload));
  }
}

function* getMutationLoading() {
  while (true) {
    yield race({
      wait: call(waitMutationChannel),
      success: take(actionGQLMutationSuccess.type),
      error: take(actionGQLMutationError.type),
    });
  }
}

export default function* mutation() {
  yield takeEvery(actionGQLMutation.type, mutateQuery);
  yield fork(getMutationLoading);
}
