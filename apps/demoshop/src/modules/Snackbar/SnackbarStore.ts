import { observable, IObservableArray } from 'mobx';
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
} from './decorators';

export default class SnackbarStore {
  @observable.shallow snacks = [] as IObservableArray<SnackbarPayload>;

  @effectShowSuccessSnack
  @actionShowSnack
  showSuccess = ({ message, options }: SnackbarPayload) => ({
    message,
    options: { ...options, variant: 'success' as VariantType },
  });

  @effectShowErrorSnack
  @actionShowSnack
  showError = ({ message, options }: SnackbarPayload) => ({
    message,
    options: {
      ...options,
      variant: 'error' as VariantType,
      // preventDuplicate: true,
      autoHideDuration: 10000,
    },
  });

  @effectShowInfoSnack
  @actionShowSnack
  showInfo = ({ message, options }: SnackbarPayload) => ({
    message,
    options: { ...options, variant: 'info' as VariantType },
  });

  @effectShowSnack
  toShow = (payload: SnackbarPayload) => {
    this.snacks.push(payload);
  };

  @actionHideSnack
  hide = (key: SnackbarKey) => ({ key });

  @effectHideSnack
  toHide = (payload: SnackbarPayload) => {
    this.snacks.push(payload);
  };

  @actionClearSnack
  clear = () => {};

  @effectClearSnack
  toClear = () => {
    if (this.snacks.length) this.snacks.clear();
  };
}
