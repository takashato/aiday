import React from 'react';
import {Button, Input, Layout, List, Modal, Text} from "react-native-ui-kitten";
import {ListItem} from "react-native-ui-kitten/ui/list/listItem.component";
import {Icon} from "react-native-eva-icons";
import {connect} from "react-redux";
import {RefreshControl, StyleSheet, View, Alert} from "react-native";
import getSocket from "../../net/socketio";
import {setRefreshing} from "../../redux/actions/room";
import {setTabIndex} from "../../redux/actions/user";
import {setChatMode, setRoomId} from "../../redux/actions/message";
import {setAppMainTitle, setChatTitle} from "../../redux/actions/app";

const PeopleIcon = (style) => (<Icon {...style} name="people"/>);
const PlusIcon = (style) => <Icon {...style} name="plus"/>;

class CommunityTab extends React.Component {
    state = {
        modalVisible: false,
        roomName: '',
        roomPassword: '',
    };

    renderItem = ({item, index}) => {
        return (
            <ListItem title={item.name} description={item.description} icon={PeopleIcon}
                      onPress={this.handleRoomPress}/>
        );
    };

    handleRoomPress = async (index, event) => {
        const {id, name} = this.props.room.list[index];
        this.props.setTabIndex(2).then(() => {
            if (this.props.message.roomId !== id) {
                this.props.setRoomId(id);
                this.props.setChatMode('multiple');
            }
            this.props.setChatTitle(name);
            this.props.setAppMainTitle(name);
        });
    };

    onCreateResult = (msg) => {
        if (msg.error) {
            Alert.alert("Lỗi tạo phòng", msg.error);
            return;
        }
        Alert.alert("Tạo phòng thành công!");
        this.setState({modalVisible: false});
    };

    async componentDidMount() {
        this.doRefresh();
    }

    componentWillUnmount(): void {
        // getSocket.off('create public room result', this.onCreateResult)
    }

    doRefresh = () => {
        this.props.setRefreshing(true);
        getSocket().emit('retrieve room list');
    };

    doCreateRoom = () => {
        getSocket.on('create public room result', this.onCreateResult);
        getSocket().emit('create room', {
            is_private: false,
            name: this.state.roomName,
            password: this.state.roomPassword,
        });
    };

    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    };

    renderModal = () => (
        <Layout style={style.modalContainer} level='3'>
            <Input label="Tên phòng" placeholder="Nhập tên phòng chat" value={this.state.roomName}/>
            <Button><Text>Tạo phòng</Text></Button>
        </Layout>
    );

    render() {
        return (
            <Layout style={{flex: 1}}>
                <List data={this.props.room.list} renderItem={this.renderItem}
                      refreshControl={<RefreshControl refreshing={this.props.room.refreshing}
                                                      onRefresh={this.doRefresh}/>}
                />
                <Button style={style.btnCreate} icon={PlusIcon} onPress={this.toggleModal}/>
                {this.state.modalVisible ?
                    <Layout style={style.modalContainer}>
                        <Layout style={style.modalForm} level='3'>
                            <Input label="Tên phòng" placeholder="Nhập tên phòng chat" value={this.state.roomName}
                                   onChangeText={val => this.setState({roomName: val})}/>
                            <Input label="Mật khẩu phòng" placeholder="Bỏ trống nếu không đặt mật khẩu"
                                   value={this.state.roomPassword}
                                   secureTextEntry={true}
                                   onChangeText={val => this.setState({roomPassword: val})}/>
                            <View style={{flexDirection: 'row'}}>
                                <Button status='success' onPress={this.doCreateRoom} style={{marginRight: 10, flex: 1}}>Tạo
                                    phòng</Button>
                                <Button status='basic' style={{flex: 1}} onPress={this.toggleModal}>Hủy</Button>
                            </View>
                        </Layout>
                    </Layout> : null}
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    btnCreate: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 50,
        width: 50,
        borderRadius: 25,
    }, modalContainer: {
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
    }
});

const mapStateToProps = state => {
    return {
        room: state.room,
        message: state.message,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTabIndex: tabIndex => {
            return new Promise((resolve) => {
                dispatch(setTabIndex(tabIndex));
                resolve();
            });
        },
        setRoomId: roomId => dispatch(setRoomId(roomId)),
        setRefreshing: (refreshing) => dispatch(setRefreshing(refreshing)),
        setChatMode: mode => dispatch(setChatMode(mode)),
        setAppMainTitle: title => dispatch(setAppMainTitle(title)),
        setChatTitle: title => dispatch(setChatTitle(title)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityTab);
