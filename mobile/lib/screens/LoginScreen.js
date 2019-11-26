import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Input, Layout} from "react-native-ui-kitten";

class LoginScreen extends React.Component {
    render() {
        return (
            <Layout style={style.screen} level="2">
                <Layout style={style.loginForm}>
                    <Input label="Số điện thoại" autoFocus={true} returnKeyType="next" ref={(input) => this.phoneInput = input}
                           onSubmitEditting={() => this.passwordInput.focus()}/>
                    <Input label="Mật khẩu" caretHidden={true} secureTextEntry={true} returnKeyType="done" ref={(input) => this.passwordInput = input}/>
                    <Button status="primary" style={style.loginBtn}>ĐĂNG NHẬP</Button>
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
        padding: 10,
    },
    loginForm: {
        width: '100%',
        padding: 10,
    },
    loginBtn: {
        marginTop: 10,
    }
});

export default LoginScreen;