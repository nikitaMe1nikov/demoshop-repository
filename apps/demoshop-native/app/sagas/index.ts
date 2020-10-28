import { fork } from 'redux-saga/effects';
import { query, mutation, subscription, resetCache } from '@demo/sagas';
import { context } from './context';
import { storage } from './storage';

export default function* rootSaga() {
  yield fork(query);
  yield fork(mutation);
  yield fork(subscription);
  yield fork(resetCache);
  yield fork(context);
  yield fork(storage);
}
