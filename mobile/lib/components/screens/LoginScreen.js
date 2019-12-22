import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Input, Layout, Text} from "react-native-ui-kitten";

class LoginScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        username: null,
        password: null,
    };

    doLogin = () => {
        const {navigate} = this.props.navigation;
        navigate('Main');
    };

    doRegister = () => {

    };

    render() {
        return (
            <Layout style={style.screen}>
                <Layout>
                    <Text category="h5" style={style.loginHeader}>AiDay</Text>
                </Layout>
                <Layout style={style.loginForm} level="2">
                    <Input label="Tài khoản" placeholder="Nhập tên tài khoản" autoFocus={true} returnKeyType="next"
                           ref={(input) => this.usernameInp = input}
                           onSubmitEditting={() => this.passwordInp.focus()}
                           onChangeText={(value) => this.setState({username: value})}
                           value={this.state.username}
                    />
                    <Input label="Mật khẩu" placeholder="Nhập mật khẩu" caretHidden={true} secureTextEntry={true}
                           returnKeyType="done"
                           ref={(input) => this.passwordInp = input}
                           onChangeText={value => this.setState({password: value})}
                           value={this.state.password}
                    />
                    <Button status="primary" style={style.loginBtn} onPress={this.doLogin}>ĐĂNG NHẬP</Button>
                    <Text style={style.registerBtn} onPress={this.doRegister}>Đăng ký tài khoản</Text>
                </Layout>
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
    },
    loginForm: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
    },
    loginBtn: {
        marginTop: 10,
    },
    registerBtn: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default LoginScreen;