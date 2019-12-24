import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {
    Button,
    Datepicker,
    Input,
    Layout,
    Popover, Spinner,
    Text,
    TopNavigation,
    TopNavigationAction
} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import moment from "moment";
import getSocket from "../../net/socketio";
import {setToken, setUser} from "../../redux/actions/user";
import {connect} from "react-redux";

const ArrowBackIcon = (style) => (<Icon {...style} name="arrow-back"/>);

class RegisterScreen extends React.Component {
    static navigationOptions = {header: null};
    static minYear = moment().startOf('year').subtract(100, 'year');
    static maxYear = moment().startOf('day');

    state = {
        loading: false,
        showPassword: false,
        username: null,
        password: null,
        display_name: null,
        birthday: null,
        usernameError: null,
        passwordError: null,
        display_nameError: null,
        birthdayError: null,
    };

    renderLeftControl = () => (<TopNavigationAction icon={ArrowBackIcon} onPress={this.handleBackButton}/>);

    handleBackButton = () => {
        if (this.props.navigation) this.props.navigation.navigate('Login');
    };

    toggleShowPassword = () => this.setState({showPassword: !this.state.showPassword});

    handleRegister = async (msg) => {
        console.log(msg);
        await this.setState({loading: false});
        if (msg.error) {
            if (msg.errorField) {
                await this.setState({[msg.errorField + 'Error']: msg.error})
            }
            return;
        }
        this.props.setUser(msg.user);
    };

    doRegister = async () => {
        const {username, password, display_name, birthday} = this.state;
        if (!username || username === '') {
            this.setState({usernameError: "Vui lòng nhập tên tài khoản."});
            return;
        }
        if (!/^([A-z0-9_]+)$/.test(username) || username.length < 5) {
            this.setState({usernameError: "Tên tài khoản chỉ gồm chữ hoa, chữ thường, số và dài ít nhất 5 ký tự."});
            return;
        }
        if (!password || password === '' || password.length < 5) {
            this.setState({passwordError: "Vui lòng nhập mật khẩu ít nhất 5 ký tự."});
            return;
        }
        if (!display_name || display_name === '') {
            this.setState({display_nameError: "Vui lòng nhập tên hiển thị."});
            return;
        }
        if (!birthday) {
            this.setState({birthdayError: "Vui lòng nhập ngày sinh."});
            return;
        }
        await this.setState({loading: true});
        getSocket().emit('register', {
            username,
            password,
            display_name,
            birthday: moment(birthday).format('DD/MM/YYYY'),
        });
        getSocket().on('register response', this.handleRegister);
    };

    render() {
        const passwordEyeIcon = (style) => (
            <Icon {...style} name={this.state.showPassword ? 'eye' : 'eye-off'}/>
        );

        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="ĐĂNG KÝ" titleStyle={{fontWeight: 'bold'}}
                               leftControl={this.renderLeftControl()}/>
                <Layout style={style.screen}>
                    <Layout style={style.registerForm} level="2">
                        <Input label="Tên tài khoản" placeholder="Gồm chữ hoa, thường, và số."
                               value={this.state.username}
                               onChangeText={val => this.setState({username: val, usernameError: null})}
                               status={this.state.usernameError ? 'danger' : 'basic'}
                               caption={this.state.usernameError || ''}
                               disabled={this.state.loading}
                        />
                        <Input
                            label="Mật khẩu"
                            value={this.state.password}
                            placeholder='Nhập mật khẩu'
                            icon={passwordEyeIcon}
                            secureTextEntry={!this.state.showPassword}
                            onIconPress={this.toggleShowPassword}
                            onChangeText={val => this.setState({password: val, passwordError: null})}
                            status={this.state.passwordError ? 'danger' : 'basic'}
                            caption={this.state.passwordError || ''}
                            disabled={this.state.loading}
                        />
                        <Input label="Tên hiển thị" placeholder="Nhập họ tên hiển thị"
                               value={this.state.display_name}
                               onChangeText={val => this.setState({display_name: val, display_nameError: null})}
                               status={this.state.display_nameError ? 'danger' : 'basic'}
                               caption={this.state.display_nameError || ''}
                               disabled={this.state.loading}
                        />
                        <Text category="c1" appearance="hint" style={{marginBottom: 4}}>Ngày sinh</Text>
                        <Datepicker date={this.state.birthday}
                                    onSelect={date => this.setState({birthday: date, birthdayError: null})}
                                    min={RegisterScreen.minYear.toDate()}
                                    max={RegisterScreen.maxYear.toDate()}
                                    status={this.state.birthdayError ? 'danger' : 'basic'}
                                    disabled={this.state.loading}
                        />
                        <Button status="success" style={{marginTop: 10}} onPress={this.doRegister}
                                disabled={this.state.loading}>Đăng ký</Button>
                    </Layout>
                </Layout>
            </SafeAreaView>
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
    registerHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
    },
    registerForm: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
    },
});

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => dispatch(setToken(token))
    };
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
