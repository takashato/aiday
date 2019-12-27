import React from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import {Avatar, Layout, Menu, Spinner, Text} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import ImagePicker from "react-native-image-crop-picker";
import {uploadToImgur} from "../../helpers/imgur_upload";
import getSocket from "../../net/socketio";

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
        }
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
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(UserTab);
