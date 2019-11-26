/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './lib/App';
import {name as appName} from './app.json';
import {init as initSocketIO} from "./lib/net/socketio";

AppRegistry.registerComponent(appName, () => App);
