import React from 'react';
import {Alert, RefreshControl} from 'react-native';
import {Layout, List, ListItem} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import getSocket from "../../net/socketio";
import {connect} from "react-redux";
import {setTabIndex} from "../../redux/actions/user";
import {setChatMode, setRoomId} from "../../redux/actions/message";

const PersonIcon = (style) => (<Icon {...style} name="person"/>);

class ContactTab extends React.Component {
    state = {
        refreshing: false,
    };

    renderItem = ({item, index}) => {
        return (
            <ListItem title={item.username} description={item.display_name} icon={PersonIcon}
                      onPress={this.handleContactPress}/>
        );
    };

    handleContactPress = async (index, event) => {
        const {id, room_id} = this.props.contactList.list[index];
        if (!room_id) {
            console.log('Request create room ', id);
            getSocket().emit('create room', {
                is_private: true,
                user_id: id,
            });
            Alert.alert('Đã yêu cầu tạo phòng!');
            return;
        }
        this.props.setTabIndex(2).then(() => {
            if (this.props.message.roomId !== room_id) {
                this.props.setRoomId(room_id);
                this.props.setChatMode('two');
            }
        });
    };

    async componentDidMount() {
        this.doRefresh();
        getSocket().on('contact list', this.contactListRetrieved);
    }

    contactListRetrieved = (msg) => {
        this.setState({refreshing: false});
    };

    doRefresh = async () => {
        this.setState({refreshing: true});
        getSocket().emit('retrieve contact list');
    };

    render() {
        return (
            <Layout style={{flex: 1}}>
                <List data={this.props.contactList.list} renderItem={this.renderItem}
                      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.doRefresh}/>}
                />
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactList: state.contactList,
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
        setChatMode: mode => dispatch(setChatMode(mode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactTab);
