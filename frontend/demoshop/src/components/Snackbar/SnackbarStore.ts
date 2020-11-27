import { observable } from 'mobx';
import { SnackbarKey, VariantType } from 'notistack';
import {
  SnackbarPayload,
  actionShowSnack,
  effectShowSuccessSnack,
  effectShowErrorSnack,
  effectShowInfoSnack,
  effectShowSnack,
  actionHideSnack,
  effectHideSnack,
  actionClearSnack,
  effectClearSnack,
  SnackbarHidePayload,
  SnackbarMessagePayload,
} from '@frontend/snackbar';

export class SnackbarStore {
  @observable.shallow snacks: Partial<SnackbarPayload & SnackbarHidePayload>[] = [];

  @effectShowSuccessSnack
  @actionShowSnack
  showSuccess = ({ message }: SnackbarMessagePayload) => ({
    message,
    options: { variant: 'success' as VariantType },
  });

  @effectShowErrorSnack
  @actionShowSnack
  showError = ({ message }: SnackbarMessagePayload) => ({
    message,
    options: {
      variant: 'error' as VariantType,
      preventDuplicate: true,
      autoHideDuration: 10000,
    },
  });

  @effectShowInfoSnack
  @actionShowSnack
  showInfo = ({ message }: SnackbarMessagePayload) => ({
    message,
    options: { variant: 'info' as VariantType },
  });

  @effectShowSnack
  toShow = (payload: SnackbarPayload) => {
    this.snacks.push(payload);
  };

  @actionHideSnack
  hide = (key: SnackbarKey) => ({ key });

  @effectHideSnack
  toHide = (payload: SnackbarHidePayload) => {
    this.snacks.push(payload);
  };

  @actionClearSnack
  clear = () => {};

  @effectClearSnack
  toClear = () => {
    if (this.snacks.length) this.snacks = [];
  };
}

export default SnackbarStore;
