import { configure, action } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import { config } from '@nimel/directorr';
import { isServer } from 'config/env';

configure({ enforceActions: 'observed' });

config.configure({ batchFunction: action });

if (isServer) {
  global.window = undefined;
  global.WebSocket = require('isomorphic-ws');

  useStaticRendering(true); // eslint-disable-line react-hooks/rules-of-hooks
} else {
  require('./polyfill');
}
