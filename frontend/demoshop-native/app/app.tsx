import './config/init';
import './i18n';
import React from 'react';
import { Directorr } from '@nimel/directorr';
import { DirectorrProvider } from '@nimel/directorr-react';
import { StyleProvider } from 'native-base';
import { logMiddleware } from '@nimel/directorr-middlewares';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createHttpClient } from 'mst-gql';
import { RootStore } from '@frontend/gql';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationRouterContainer from 'components/NavigationRouter/NavigationRouterContainer';
import SnackbarContainer from 'components/Snackbar/SnackbarContainer';
import linking from 'config/linking';
import getTheme from 'theme/components';
import platform from 'theme/variables/platform';
import { MainNavigator } from 'navigation/MainNavigator';
import ModalBoxContainer from 'components/ModalBox/ModalBoxContainer';

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

const gqlHttpClient = createHttpClient('http://localhost:4000/graphql', {
  credentials: 'same-origin',
});

const gqlWsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
  reconnect: true,
});

const directorr = new Directorr({ context: { gqlHttpClient, gqlWsClient } });

directorr.addMiddlewares([logMiddleware]);

directorr.addStores([RootStore]);

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
