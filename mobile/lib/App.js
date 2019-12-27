/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {mapping, dark as darkTheme, light as lightTheme} from '@eva-design/eva';
import {
    StatusBar,
    StyleSheet,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import AsyncStorage from "@react-native-community/async-storage";
import {PersistGate} from 'redux-persist/integration/react'

import {ApplicationProvider, Layout, Text} from "react-native-ui-kitten";
import LoginScreen from "./components/screens/LoginScreen";
import SplashScreen from "./components/screens/SplashScreen";

import MainScreen from "./components/screens/MainScreen";
import {init as initSocketIO} from "./net/socketio";
import {connect, Provider} from "react-redux";
import store, {persistor} from "./redux/store";
import RegisterScreen from "./components/screens/RegisterScreen";
import {setToken} from "./redux/actions/user";


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

const App = connect((state) => ({app: state.app, user: state.user}))(
    class extends React.Component {
        state = {isLoading: true};

        async componentDidMount() {
            this.setState({isLoading: true});
            try {
                try {
                    const token = await AsyncStorage.getItem('accessToken');
                    if (token)
                        await store.dispatch(setToken(token));
                } catch (err) {
                    console.log(err);
                }
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
            let app;
            if (this.state.isLoading) {
                app = <SplashScreen/>;
            } else {
                if (!this.props.user.accessToken)
                    app = <LoginContainer/>;
                else
                    app = <MainContainer/>;
            }
            return (
                <>
                    <StatusBar
                        backgroundColor={this.props.app.theme === 'light' ? "#EEEEEE" : "#18203B"}
                        barStyle={this.props.app.theme === 'light' ? 'dark-content' : 'light-content'}
                    />
                    <ApplicationProvider mapping={mapping} theme={this.props.app.theme === 'light' ? lightTheme : darkTheme}>
                        <PersistGate loading={<SplashScreen/>} persistor={persistor}>
                            {app}
                        </PersistGate>
                    </ApplicationProvider>
                </>
            );
        }
    });

const ProvidedApp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

const styles = StyleSheet.create({});

export default ProvidedApp;
