import { put, takeEvery, delay } from 'redux-saga/effects';
import { config, Action } from '@nimel/directorr';
import { DELAY_ACTION } from './constants';
import { DelayActionPayload } from './types';

const { createAction } = config;

function* waitAction({
  payload: {
    wait,
    nextAction: { type, payload },
  },
}: Action<string, DelayActionPayload>) {
  yield delay(wait);

  yield put(createAction(type, payload));
}

export default function* delayAction() {
  yield takeEvery(DELAY_ACTION, waitAction);
}
