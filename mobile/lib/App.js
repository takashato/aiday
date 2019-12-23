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
    StatusBar,
    StyleSheet,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";

import {ApplicationProvider, Layout, Text} from "react-native-ui-kitten";
import LoginScreen from "./components/screens/LoginScreen";
import SplashScreen from "./components/screens/SplashScreen";

import MainScreen from "./components/screens/MainScreen";
import {init as initSocketIO} from "./net/socketio";
import {connect, Provider} from "react-redux";
import store from "./redux/store";
import RegisterScreen from "./components/screens/RegisterScreen";


const MainNavigator = createStackNavigator({
    Main: {screen: MainScreen},
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});

const LoginNavigator = createStackNavigator({
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});

const MainContainer = createAppContainer(MainNavigator);
const LoginContainer = createAppContainer(LoginNavigator);

const ApplicationContent = connect((state) => ({user: state.user}))(
    class extends React.Component {
        render() {
            if (!this.props.user.data)
                return <LoginContainer/>;
            return <MainContainer/>;
        }
    }
);

class App extends React.Component {
    state = {isLoading: true};

    async componentDidMount() {
        this.setState({isLoading: true});
        try {
            if (await initSocketIO()) {
                this.setState({isLoading: false});
            }
        } catch (err) {
            console.error(err);
        }
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
            <Provider store={store}>
                <StatusBar
                    backgroundColor="#18203B"
                    barStyle="light-content"
                />
                <ApplicationProvider mapping={mapping} theme={darkTheme}>
                    {app}
                </ApplicationProvider>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({});

export default App;
