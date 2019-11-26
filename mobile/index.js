/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './lib/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import {init as initSocketIO} from "./lib/net/socketio";

initSocketIO();

AppRegistry.registerComponent(appName, () => App);
