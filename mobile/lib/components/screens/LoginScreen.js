import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Input, Layout, Text} from "react-native-ui-kitten";
import getSocket from "../../net/socketio";
import {setUser} from "../../redux/actions/user";
import {connect} from "react-redux";

class LoginScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        username: null,
        password: null,
        usernameCaption: null,
        passwordCaption: null,
    };

    loginHandle = (msg) => {
        if (msg.error) {
            if (msg.errorField === 'username') {
                this.setState({usernameCaption: msg.error});
            } else if (msg.errorField === 'password') {
                this.setState({passwordCaption: msg.error});
            }
            return;
        }
        this.props.setUser(msg.user);
    };

    doLogin = () => {
        const {username, password} = this.state;
        if (!username || username === '') {
            this.setState({usernameCaption: 'Vui lòng nhập tài khoản.'})
        }
        if (!password || password === '') {
            this.setState({passwordCaption: 'Vui lòng nhập mật khẩu.'})
        }
        getSocket().emit("login", {username: username, password: password});
        getSocket().on("login response", this.loginHandle);
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
                           status={this.state.usernameCaption ? 'danger' : 'basic'}
                           caption={this.state.usernameCaption || ''}
                           onChangeText={(value) => this.setState({username: value, usernameCaption: null})}
                           value={this.state.username}
                    />
                    <Input label="Mật khẩu" placeholder="Nhập mật khẩu" caretHidden={true} secureTextEntry={true}
                           returnKeyType="done"
                           ref={(input) => this.passwordInp = input}
                           status={this.state.passwordCaption ? 'danger' : 'basic'}
                           caption={this.state.passwordCaption || ''}
                           onChangeText={value => this.setState({password: value, passwordCaption: null})}
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
