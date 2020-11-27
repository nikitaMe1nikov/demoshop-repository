import { configure, action } from 'mobx';
import { config } from '@nimel/directorr';

configure({ enforceActions: 'observed' });

config.configure({ batchFunction: action });
