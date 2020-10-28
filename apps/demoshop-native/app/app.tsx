import '@demoshop-native/config/init';
import '@demoshop-native/i18n';
import React from 'react';
import { Directorr } from '@nimel/directorr';
import { DirectorrProvider } from '@nimel/directorr-react';
import createSagaMiddleware from 'redux-saga';
import { StyleProvider } from 'native-base';
import { logMiddleware } from '@nimel/directorr-middlewares';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { APOLLO_CLIENT_CONTEXT } from '@demo/sagas';
import NavigationRouterContainer from '@demoshop-native/components/NavigationRouter/NavigationRouterContainer';
import SnackbarContainer from '@demoshop-native/components/Snackbar/SnackbarContainer';
import rootSaga from '@demoshop-native/sagas';
import { STORAGE_CONTEXT } from '@demoshop-native/sagas/constants';
import apolloClient from '@demoshop-native/config/apolloClient';
import linking from '@demoshop-native/config/linking';
import getTheme from '@demoshop-native/theme/components';
import { showErrorSnackMiddleware } from '@demoshop-native/middlewares';
import platform from '@demoshop-native/theme/variables/platform';
import { MainNavigator } from '@demoshop-native/navigation/MainNavigator';
import ModalBoxContainer from '@demoshop-native/components/ModalBox/ModalBoxContainer';

const theme = {
  dark: false,
  colors: {
    primary: platform.brandPrimary,
    background: platform.containerBgColor,
    card: platform.cardDefaultBg,
    text: platform.inverseTextColor,
    border: platform.cardBorderColor,
    notification: platform.brandDanger,
  },
};

const sagaMiddleware = createSagaMiddleware({
  context: {
    [APOLLO_CLIENT_CONTEXT]: apolloClient,
    [STORAGE_CONTEXT]: AsyncStorage,
  },
});

const directorr = new Directorr();

directorr.addMiddlewares(logMiddleware, showErrorSnackMiddleware);
directorr.addReduxMiddlewares(sagaMiddleware);
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <DirectorrProvider value={directorr}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <StyleProvider style={getTheme(platform)}>
          <SnackbarContainer>
            <NavigationRouterContainer theme={theme} linking={linking}>
              <ModalBoxContainer MainNavigator={MainNavigator} />
            </NavigationRouterContainer>
          </SnackbarContainer>
        </StyleProvider>
      </SafeAreaProvider>
    </DirectorrProvider>
  );
}

export default App;
