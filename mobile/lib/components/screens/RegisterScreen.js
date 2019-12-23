import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Button, Datepicker, Input, Layout, Text, TopNavigation, TopNavigationAction} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import moment from "moment";

const ArrowBackIcon = (style) => (<Icon {...style} name="arrow-back"/>);

class RegisterScreen extends React.Component {
    static navigationOptions = {header: null};
    static minYear = moment().startOf('year').subtract(100,'year');
    static maxYear = moment().startOf('day');

    state = {
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

    render() {
        const passwordEyeIcon = (style) => (
            <Icon {...style} name={this.state.showPassword ? 'eye' : 'eye-off'}/>
        );

        console.log(this.minYear);

        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="ĐĂNG KÝ" titleStyle={{fontWeight: 'bold'}}
                               leftControl={this.renderLeftControl()}/>
                <Layout style={style.screen}>
                    <Layout style={style.registerForm} level="2">
                        <Input label="Tên tài khoản" placeholder="Gồm chữ hoa, thường, và số."
                               value={this.state.username}
                               onChangeText={val => this.setState({username: val, usernameError: null})}/>
                        <Input
                            label="Mật khẩu"
                            value={this.state.password}
                            placeholder='Nhập mật khẩu'
                            icon={passwordEyeIcon}
                            secureTextEntry={!this.state.showPassword}
                            onIconPress={this.toggleShowPassword}
                            onChangeText={val => this.setState({password: val, passwordError: null})}
                        />
                        <Input label="Tên hiển thị" placeholder="Nhập họ tên hiển thị" value={this.state.display_name}
                               onChangeText={val => this.setState({display_name: val, display_nameError: null})}/>
                        <Text category="c1" appearance="hint" style={{marginBottom: 4}}>Ngày sinh</Text>
                        <Datepicker date={this.state.birthday}
                                    onSelect={date => this.setState({birthday: date, birthdayError: null})}
                                    min={RegisterScreen.minYear.toDate()}
                                    max={RegisterScreen.maxYear.toDate()}
                        />
                        <Button status="success" style={{marginTop: 10}}>Đăng ký</Button>
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

export default RegisterScreen;
