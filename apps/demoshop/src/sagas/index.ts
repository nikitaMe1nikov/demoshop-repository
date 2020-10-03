import { fork } from 'redux-saga/effects';
import query from './query';
import mutation from './mutation';
import subscription from './subscription';
import resetCache from './resetCache';
import delayAction from './delayAction';

import { isBrowser } from 'config/env';

export default function* sagas() {
  yield fork(query);
  yield fork(mutation);
  if (isBrowser) yield fork(subscription);
  yield fork(resetCache);
  yield fork(delayAction);
}
