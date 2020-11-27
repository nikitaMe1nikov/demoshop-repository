// import { delay } from '@nimel/directorr';
import { initStoreSuccessEffect, isReadyAction } from '@nimel/directorr-appinitializer';
import { actionRouterPush } from '@nimel/directorr-router';
import SplashScreen from 'react-native-splash-screen';
import { effectShowErrorSnack } from '@frontend/snackbar';
import { ROOT_URL } from '@frontend/url';

export default class AppLoadFromStore {
  @initStoreSuccessEffect
  @isReadyAction
  whenReadyToLoad = () => {
    this.hideSplash();
    this.toPush();
  };

  @actionRouterPush
  toPush = () => ({
    path: ROOT_URL,
  });

  hideSplash = () => {
    SplashScreen.hide();
  };

  @effectShowErrorSnack
  toHaveError = () => {
    this.hideSplash();
  };
}
