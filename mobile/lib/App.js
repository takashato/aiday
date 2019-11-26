/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {
    StyleSheet,
} from 'react-native';

import {ApplicationProvider, Layout, Text} from "react-native-ui-kitten";
import LoginScreen from "./screens/LoginScreen";
import SplashScreen from "./screens/SplashScreen";

import socket, {init as initSocketIO} from "./net/socketio";

const ApplicationContent = () => (
    <LoginScreen/>
);

class App extends React.Component {
    state = {isLoading: true};

    componentDidMount() {
        this.setState({isLoading: false});
    }

    constructor(props) {
        super(props);
    }

    render() {
        let app = <ApplicationContent/>;
        if (this.state.isLoading) {
            app = <SplashScreen/>;
        }
        return (
            <ApplicationProvider mapping={mapping} theme={darkTheme}>
                {app}
            </ApplicationProvider>
        );
    }
}

const styles = StyleSheet.create({});

export default App;
