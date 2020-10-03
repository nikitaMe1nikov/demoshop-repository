import { eventChannel, END } from 'redux-saga';
import { put, call, take, takeEvery, getContext } from 'redux-saga/effects';
import { config, Action } from '@nimel/directorr';
import { ApolloClient } from 'apollo-client';
import {
  APOLLO_CLIENT_CONTEXT,
  SUBSCRIPTION_QUERY,
  SUBSCRIPTION_QUERY_SUCCESS,
  SUBSCRIPTION_QUERY_ERROR,
} from './constants';
import { GQLPayload } from './types';

const { createAction } = config;

function createSubscriptionChannel(
  subscriptionObservable: ReturnType<ApolloClient<any>['subscribe']>
) {
  return eventChannel((emit) => {
    const stream = subscriptionObservable.subscribe({
      next: (v) => emit(v),
      error: (e) => emit(new Error(e)),
      complete: () => emit(END),
    });

    return () => stream.unsubscribe();
  });
}

function* subscriptionQuery({ payload }: Action<string, GQLPayload>) {
  const apolloClient: ApolloClient<any> = yield getContext(APOLLO_CLIENT_CONTEXT);
  const apolloObservable = apolloClient.subscribe({
    ...payload,
  });
  const channel = yield call(createSubscriptionChannel, apolloObservable);

  while (true) {
    try {
      const { data } = yield take(channel);

      yield put(createAction(SUBSCRIPTION_QUERY_SUCCESS, { ...payload, data }));
    } catch (error) {
      channel.close();

      yield put(createAction(SUBSCRIPTION_QUERY_ERROR, { ...payload, errors: [error] }));
    }
  }
}

export default function* subscription() {
  yield takeEvery(SUBSCRIPTION_QUERY, subscriptionQuery);
}
