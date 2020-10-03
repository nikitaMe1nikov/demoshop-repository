import { createActionAndEffect } from '@nimel/directorr';
import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

export interface SnackbarPayload {
  message?: SnackbarMessage;
  options?: OptionsObject;
  key?: SnackbarKey;
}

export const SNACKBAR_SHOW_ERROR = 'SNACKBAR.SHOW_ERROR';
export const SNACKBAR_SHOW_SUCCESS = 'SNACKBAR.SHOW_SUCCESS';
export const SNACKBAR_SHOW_INFO = 'SNACKBAR.SHOW_INFO';

export const [actionShowSnack, effectShowSnack] = createActionAndEffect<SnackbarPayload>(
  'SNACKBAR.SHOW'
);
export const [actionShowSuccessSnack, effectShowSuccessSnack] = createActionAndEffect<
  SnackbarPayload
>(SNACKBAR_SHOW_SUCCESS);
export const [actionShowErrorSnack, effectShowErrorSnack] = createActionAndEffect<SnackbarPayload>(
  SNACKBAR_SHOW_ERROR
);
export const [actionShowInfoSnack, effectShowInfoSnack] = createActionAndEffect<SnackbarPayload>(
  SNACKBAR_SHOW_INFO
);
export const [actionHideSnack, effectHideSnack] = createActionAndEffect<SnackbarPayload>(
  'SNACKBAR.HIDE'
);
export const [actionClearSnack, effectClearSnack] = createActionAndEffect('SNACKBAR.CLEAR');
