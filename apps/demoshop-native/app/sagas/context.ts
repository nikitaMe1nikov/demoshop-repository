import { put, setContext, takeEvery, getContext } from 'redux-saga/effects';
import { config, Action } from '@nimel/directorr';
import { createActionAndEffect } from '@nimel/directorr';

export interface ContextGetPayload {
  key: string;
}

export interface ContextSetPayload extends ContextGetPayload {
  context: any;
}

export type ContextGetSuccessPayload = ContextSetPayload;

export const [actionContextGet, effectContextGet] = createActionAndEffect<ContextGetPayload>(
  'CONTEXT.GET'
);
export const [actionContextGetLoading, effectContextGetLoading] = createActionAndEffect<
  ContextGetPayload
>('CONTEXT.GET_LOADING');
export const [actionContextGetSuccess, effectContextGetSuccess] = createActionAndEffect<
  ContextGetSuccessPayload
>('CONTEXT.GET_SUCCESS');

export const [actionContextSet, effectContextSet] = createActionAndEffect<ContextSetPayload>(
  'CONTEXT.SET'
);
export const [actionContextSetLoading, effectContextSetLoading] = createActionAndEffect<
  ContextSetPayload
>('CONTEXT.SET_LOADING');
export const [actionContextSetSuccess, effectContextSetSuccess] = createActionAndEffect<
  ContextSetPayload
>('CONTEXT.SET_SUCCESS');

const { createAction } = config;

function* contextGet({ payload }: Action<string, ContextGetPayload>) {
  yield put(createAction(actionContextGetLoading.type, payload));

  const context = yield getContext(payload.key);

  yield put(createAction(actionContextGetSuccess.type, { ...payload, context }));
}

function* contextSet({ payload }: Action<string, ContextSetPayload>) {
  yield put(createAction(actionContextSetLoading.type, payload));

  yield setContext({ [payload.key]: payload.context });

  yield put(createAction(actionContextSetSuccess.type, payload));
}

export function* context() {
  yield takeEvery(actionContextGet.type, contextGet);
  yield takeEvery(actionContextSet.type, contextSet);
}
