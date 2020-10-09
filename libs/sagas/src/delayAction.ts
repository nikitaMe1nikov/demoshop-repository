import { put, takeEvery, delay } from 'redux-saga/effects';
import { Action } from '@nimel/directorr';
import { actionDelayAction } from './decorators';
import { DelayActionPayload } from './types';

function* waitAction({ payload: { wait, nextAction } }: Action<string, DelayActionPayload>) {
  yield delay(wait);

  yield put(nextAction);
}

export default function* delayAction() {
  yield takeEvery(actionDelayAction.type, waitAction);
}
