import App from './app/app.tsx';
import { AppRegistry, LogBox } from 'react-native';

const APP_NAME = 'Demoshop';

// drop logs
LogBox.ignoreLogs(['Require cycle:']);

AppRegistry.registerComponent(APP_NAME, () => App);
