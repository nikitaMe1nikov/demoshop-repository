import '@demoshop/config/init';
import React, { useEffect, FC } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ModalBoxContainer from '@demoshop/components/ModalBox/ModalBoxContainer';
import SnackbarContainer from '@demoshop/components/Snackbar/SnackbarContainer';
import { Directorr } from '@nimel/directorr';
import { logMiddleware } from '@nimel/directorr-middlewares';
import {
  MakeDirectorr,
  NextWithDirectorrProps,
  nextWithDirectorr,
  NextHistoryStore,
} from '@nimel/directorr-next';
import theme from '@demoshop/config/theme';
import { isBrowser } from '@demo/env';
import NoSsr from '@material-ui/core/NoSsr';
import { createHttpClient } from 'mst-gql';
import { RootStore } from '@demo/mst-gql';

const gqlHttpClient = createHttpClient('http://localhost:4200/graphql', {
  credentials: 'same-origin',
});

const gqlWsClient = new SubscriptionClient('ws://localhost:3333/graphql', {
  reconnect: true,
});

export const makeDirectorr: MakeDirectorr = (ctx, router, initState?) => {
  if (ctx?.req) gqlHttpClient.setHeader('cookie', ctx?.req?.headers.cookie as string);

  const context = { gqlHttpClient, gqlWsClient };

  const directorr = new Directorr({ initState, context });

  const store = directorr.addStore(NextHistoryStore);

  if (router) {
    const { pathname: pattern, asPath: path, query: queryObject } = router;

    store.toSetState({ pattern, path, queryObject });
  }

  directorr.addStores([RootStore]);

  directorr.addMiddlewares([logMiddleware]);

  if (isBrowser) {
    (window as any).directorr = directorr;
  }

  return directorr;
};

const useStyles = makeStyles({
  '@global': {
    'html, body, #__next': {
      width: '100%',
      minHeight: '100%',
    },
    html: {
      'overflow-y': 'scroll',
    },
    'a:-webkit-any-link': {
      color: 'inherit',
      'text-decoration': 'none',
    },
  },
});

export const CustomApp: FC<NextWithDirectorrProps> = ({ Component }) => {
  useStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component />
        <NoSsr>
          <ModalBoxContainer />
          <SnackbarContainer />
        </NoSsr>
      </ThemeProvider>
    </>
  );
};

export default nextWithDirectorr(makeDirectorr)(CustomApp);
