import { put, takeEvery, delay } from 'redux-saga/effects';
import { Action, config } from '@nimel/directorr';
import { actionDelayAction } from './decorators';
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

export function* delayAction() {
  yield takeEvery(actionDelayAction.type, waitAction);
}
