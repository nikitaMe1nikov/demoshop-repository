import { createActionAndEffect } from '@nimel/directorr';
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

export interface SnackbarMessagePayload {
  message: string;
}
export interface SnackbarPayload {
  message: SnackbarMessage;
  options?: OptionsObject;
}

export interface SnackbarHidePayload {
  key: SnackbarKey;
}

export const [actionShowSnack, effectShowSnack] = createActionAndEffect<SnackbarPayload>(
  'SNACKBAR.SHOW'
);
export const [actionShowSuccessSnack, effectShowSuccessSnack] = createActionAndEffect<
  SnackbarMessagePayload
>('SNACKBAR.SHOW_SUCCESS');
export const [actionShowErrorSnack, effectShowErrorSnack] = createActionAndEffect<
  SnackbarMessagePayload
>('SNACKBAR.SHOW_ERROR');
export const [actionShowInfoSnack, effectShowInfoSnack] = createActionAndEffect<
  SnackbarMessagePayload
>('SNACKBAR.SHOW_INFO');
export const [actionHideSnack, effectHideSnack] = createActionAndEffect<SnackbarHidePayload>(
  'SNACKBAR.HIDE'
);
export const [actionClearSnack, effectClearSnack] = createActionAndEffect('SNACKBAR.CLEAR');
