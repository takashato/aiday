import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {Avatar, Button, Input, Layout, Menu, Spinner, Text} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import ImagePicker from "react-native-image-crop-picker";
import {uploadToImgur} from "../../helpers/imgur_upload";
import getSocket from "../../net/socketio";
import {ol} from "react-native-render-html/src/HTMLRenderers";
import {setToken} from "../../redux/actions/user";

const ImageIcon = (style) => (<Icon {...style} name="image-outline"/>);
const KeyIcon = (style) => (<Icon {...style} name="lock-outline"/>);
const PersonIcon = (style) => (<Icon {...style} name="person-outline"/>);
const LogoutIcon = (style) => (<Icon {...style} name='log-out-outline'/>);

class UserTab extends React.Component {
    state = {
        imageUploading: false,
        changePassModalVisible: false,
        changeDisplayNameModalVisible: false,
        oldPassword: '',
        newPassword: '',
        displayName: '',
    };

    menuData = [
        {
            key: 'change_avatar',
            title: 'Đổi avatar',
            icon: ImageIcon,
        },
        {
            key: 'change_pass',
            title: 'Đổi mật khẩu',
            icon: KeyIcon,
        }, {
            key: 'change_display_name',
            title: 'Đổi tên hiển thị',
            icon: PersonIcon,
        }, {
            key: 'logout',
            title: 'Đăng xuất',
            icon: LogoutIcon,
        }
    ];

    selectMenu = (index, event) => {
        const item = this.menuData[index];
        if (item.key === 'change_avatar') {
            ImagePicker.openPicker({
                includeBase64: true,
                mediaType: 'photo',
            }).then(async image => {
                await this.setState({imageUploading: true});
                const res = await uploadToImgur(image);
                if (res) {
                    getSocket().emit('change info', {field: 'avatar', avatar: res.link});
                }
                await this.setState({imageUploading: false});
            });
            return;
        }
        if (item.key === 'change_pass') {
            this.togglePasswordModal();
            return;
        }
        if (item.key === 'change_display_name') {
            this.toggleDisplayNameModal();
            return;
        }
        if (item.key === 'logout') {
            this.props.setToken(null);
            return;
        }
    };

    togglePasswordModal = () => {
        this.setState({changePassModalVisible: !this.state.changePassModalVisible});
    };

    toggleDisplayNameModal = () => {
        this.setState({changeDisplayNameModalVisible: !this.state.changeDisplayNameModalVisible});
    };

    changePassword = () => {
        const {oldPassword, newPassword} = this.state;
        if (!oldPassword || !newPassword || newPassword.length < 5) return;
        getSocket().emit('change info', {field: 'password', old_password: oldPassword, new_password: newPassword});
        this.togglePasswordModal();
    };

    updateDisplayName = () => {
        const {displayName} = this.state;
        if (!displayName) return;
        getSocket().emit('change info', {field: 'display_name', display_name: displayName});
        this.toggleDisplayNameModal();
    };

    render() {
        const user = this.props.user.data;
        if (user == null) return (null);
        return (
            <Layout level="3" style={{flex: 1, flexDirection: 'column', margin: 8, padding: 8, borderRadius: 5}}>
                <View level="3" style={{flexDirection: 'row'}}>
                    <View>
                        {this.state.imageUploading ?
                            <View style={{margin: 12}}>
                                <Spinner size="medium"/>
                            </View>
                            : <Avatar source={{uri: user.avatar}}/>}
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                        <Text category="h6">{user.display_name}</Text>
                        <Text appearance="hint">@{user.username}</Text>
                    </View>
                </View>
                <View style={{flex: 1, marginTop: 20,}}>
                    <Menu data={this.menuData} onSelect={this.selectMenu}/>
                </View>
                {this.state.changePassModalVisible ?
                    <Layout style={style.modalContainer}>
                        <Layout style={style.modalForm} level='3'>
                            <Input secureTextEntry={true} label="Mật khẩu hiện tại" value={this.state.oldPassword}
                                   onChangeText={val => this.setState({oldPassword: val})}/>
                            <Input secureTextEntry={true} label="Mật khẩu mới" value={this.state.newPassword}
                                   onChangeText={val => this.setState({newPassword: val})}/>
                            <Layout style={{flexDirection: 'row'}}>
                                <Button status="success" style={{flex: 1, marginRight: 3}}
                                        onPress={this.changePassword}>Đổi mật khẩu</Button>
                                <Button status="basic" style={{flex: 1}} onPress={this.togglePasswordModal}>Hủy</Button>
                            </Layout>
                        </Layout>
                    </Layout>
                    : null}
                {this.state.changeDisplayNameModalVisible ?
                    <Layout style={style.modalContainer}>
                        <Layout style={style.modalForm} level='3'>
                            <Input label="Nhập tên hiển thị mới" value={this.state.displayName}
                                   onChangeText={val => this.setState({displayName: val})}/>
                            <Layout style={{flexDirection: 'row'}}>
                                <Button status="success" style={{flex: 1, marginRight: 3}}
                                        onPress={this.updateDisplayName}>Lưu lại</Button>
                                <Button status="basic" style={{flex: 1}} onPress={this.toggleDisplayNameModal}>Hủy</Button>
                            </Layout>
                        </Layout>
                    </Layout>
                    : null}
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        zIndex: 101,
    }, modalForm: {
        padding: 16,
        width: '100%',
        borderRadius: 10,
    }
});

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => dispatch(setToken(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTab);
