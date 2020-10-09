import '@demoshop/config/init';
import React, { useEffect, FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NoSsr from '@material-ui/core/NoSsr';
import createSagaMiddleware from 'redux-saga';
import { Directorr } from '@nimel/directorr';
import { logMiddleware } from '@nimel/directorr-middlewares';
import {
  MakeDirectorr,
  NextWithDirectorrProps,
  nextWithDirectorr,
  NextHistoryStore,
} from '@nimel/directorr-next';
import { APOLLO_CLIENT_CONTEXT, APOLLO_CONTEXT, rootSaga } from '@demo/sagas';
import theme from '@demoshop/config/theme';
import { isServer, isBrowser } from '@demo/env';
import showErrorMiddleware from '@demoshop/middlewares/showErrorMiddleware';
import ModalBoxContainer from '@demoshop/components/ModalBox/ModalBoxContainer';
import SnackbarContainer from '@demoshop/components/Snackbar/SnackbarContainer';
import { EMPTY_OBJECT } from '@demoshop/utils/constants';

const httpLink = new HttpLink({
  uri: 'http://localhost:4200/graphql',
  credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3333/graphql`,
  options: {
    reconnect: true,
  },
});

const apolloClient = new ApolloClient({
  ssrMode: isServer,
  link: ApolloLink.from([
    split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink
    ),
  ]),
  cache: new InMemoryCache(),
});

export const makeDirectorr: MakeDirectorr = (ctx, router, initialState?) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      [APOLLO_CLIENT_CONTEXT]: apolloClient,
      [APOLLO_CONTEXT]:
        ctx && ctx.req
          ? {
              headers: {
                cookie: ctx.req.headers.cookie,
              },
            }
          : EMPTY_OBJECT,
    },
  });

  const directorr = new Directorr();

  directorr.addReduxMiddlewares(sagaMiddleware);
  sagaMiddleware.run(rootSaga);

  if (initialState) directorr.addInitState(initialState);

  if (router) {
    const { pathname: pattern, asPath: path, query: queryObject } = router;

    directorr.addStore(NextHistoryStore, { pattern, path, queryObject });
  } else {
    directorr.addStore(NextHistoryStore);
  }

  directorr.addMiddlewares(logMiddleware, showErrorMiddleware);

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
