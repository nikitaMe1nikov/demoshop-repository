import { Toast } from 'native-base';
import {
  effectShowSuccessSnack,
  effectShowErrorSnack,
  effectShowInfoSnack,
  SnackbarMessagePayload,
} from '@frontend/snackbar';
import {
  SnackbarPayload,
  Options,
  TYPE,
  POSITION,
  actionShowSnack,
  effectShowSnack,
} from './decorators';

export class SnackbarStore {
  static storeInitOptions = {
    duration: 1600,
    position: POSITION.BOTTOM,
  };

  defaultOptions: SnackbarPayload;

  constructor(defaultOptions: SnackbarPayload) {
    this.defaultOptions = defaultOptions;
  }

  @actionShowSnack
  show = (payload: Options) => payload;

  @effectShowSuccessSnack
  @actionShowSnack
  toShowSuccess = ({ message }: SnackbarMessagePayload) => ({
    text: message,
    type: TYPE.SUCCESS,
  });

  @effectShowInfoSnack
  @actionShowSnack
  toShowWarning = ({ message }: SnackbarMessagePayload) => ({
    text: message,
  });

  @effectShowErrorSnack
  @actionShowSnack
  toShowDanger = ({ message }: SnackbarMessagePayload) => ({
    text: message,
    type: TYPE.DANGER,
    duration: 10000,
  });

  @effectShowSnack
  toShow = (payload: SnackbarPayload) => {
    Toast.show({ ...this.defaultOptions, ...payload });
  };
}
