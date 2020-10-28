import { put, call, takeEvery, getContext } from 'redux-saga/effects';
import { config, Action } from '@nimel/directorr';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_CONTEXT } from './constants';
import { createActionAndEffect } from '@nimel/directorr';

export interface StorageGetPayload {
  key: string;
}

export interface StorageSavePayload extends StorageGetPayload {
  data: any;
}

export type StorageRemovePayload = StorageGetPayload;

export const [actionStorageGet, effectStorageGet] = createActionAndEffect<StorageGetPayload>(
  'STORAGE.GET_DATA'
);
export const [actionStorageGetLoading, effectStorageGetLoading] = createActionAndEffect<
  StorageGetPayload
>('STORAGE.GET_DATA_LOADING');
export const [actionStorageGetSuccess, effectStorageGetSuccess] = createActionAndEffect<
  StorageGetPayload
>('STORAGE.GET_DATA_SUCCESS');

export const [actionStorageError, effectStorageError] = createActionAndEffect<StorageGetPayload>(
  'STORAGE.GET_DATA_ERROR'
);

export const [actionStorageSave, effectStorageSave] = createActionAndEffect<StorageSavePayload>(
  'STORAGE.SAVE_DATA'
);
export const [actionStorageSaveLoading, effectStorageSaveLoading] = createActionAndEffect<
  StorageSavePayload
>('STORAGE.SAVE_DATA_LOADING');
export const [actionStorageSaveSuccess, effectStorageSaveSuccess] = createActionAndEffect<
  StorageSavePayload
>('STORAGE.SAVE_DATA_SUCCESS');

export const [actionStorageRemove, effectStorageRemove] = createActionAndEffect<
  StorageRemovePayload
>('STORAGE.REMOVE_DATA');
export const [actionStorageRemoveLoading, effectStorageRemoveLoading] = createActionAndEffect<
  StorageRemovePayload
>('STORAGE.REMOVE_DATA_LOADING');
export const [actionStorageRemoveSuccess, effectStorageRemoveSuccess] = createActionAndEffect<
  StorageRemovePayload
>('STORAGE.REMOVE_DATA_SUCCESS');

const { createAction } = config;

function* storageGet({ payload }: Action<string, StorageGetPayload>) {
  const storage: typeof AsyncStorage = yield getContext(STORAGE_CONTEXT);

  try {
    yield put(createAction(actionStorageGetLoading.type, payload));

    const data = yield call(storage.getItem, payload.key);

    yield put(createAction(actionStorageGetSuccess.type, { ...payload, data }));
  } catch (error) {
    yield put(createAction(actionStorageError.type, { ...payload, error }));
  }
}

function* storageSave({ payload }: Action<string, StorageSavePayload>) {
  const storage: typeof AsyncStorage = yield getContext(STORAGE_CONTEXT);

  try {
    yield put(createAction(actionStorageSaveLoading.type, payload));

    const data = yield call(storage.getItem, payload.key);

    yield put(createAction(actionStorageSaveSuccess.type, { ...payload, data }));
  } catch (error) {
    yield put(createAction(actionStorageError.type, { ...payload, error }));
  }
}

function* storageRemove({ payload }: Action<string, StorageRemovePayload>) {
  const storage: typeof AsyncStorage = yield getContext(STORAGE_CONTEXT);

  try {
    yield put(createAction(actionStorageRemoveLoading.type, payload));

    const data = yield call(storage.getItem, payload.key);

    yield put(createAction(actionStorageRemoveSuccess.type, { ...payload, data }));
  } catch (error) {
    yield put(createAction(actionStorageError.type, { ...payload, error }));
  }
}

export function* storage() {
  yield takeEvery(actionStorageGet.type, storageGet);
  yield takeEvery(actionStorageSave.type, storageSave);
  yield takeEvery(actionStorageRemove.type, storageRemove);
}
