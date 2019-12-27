import React from 'react';
import {StyleSheet, ScrollView, Keyboard, RefreshControl, TouchableOpacity, Image, Linking} from 'react-native';
import {Avatar, Button, Input, Layout, Spinner, Text} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import {connect} from "react-redux";
import getSocket from "../../net/socketio";
import {pushMessage, setMessages, setRoomId} from "../../redux/actions/message";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import {uploadToImgur} from "../../helpers/imgur_upload";
import HTML from "react-native-render-html";

const SendIcon = style => (<Icon {...style} name="paper-plane"/>);
const ImageIcon = style => (<Icon {...style} name="image"/>);

class MessageTab extends React.Component {
    state = {
        chatText: '',
        imageUploading: false,
    };

    componentDidMount(): void {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    }

    componentWillUnmount(): void {
        this.keyboardDidShowListener.remove();
    }

    keyboardDidShow = () => {
        if (this && this.scrollView)
            this.scrollView.scrollToEnd({animated: true});
    };

    sendMessage = async () => {
        if (!this.state.chatText || this.state.chatText === '') return;
        const {chatText} = this.state;
        this.setState({chatText: ''});
        const pendingStamp = new Date().getTime();
        this.props.pushMessage(this.props.message.roomId, {
            id: -1,
            message: chatText,
            user: this.props.user.data,
            pending_stamp: pendingStamp,
            updated_at: moment().format(),
        });

        getSocket().emit('push message', {
            room_id: this.props.message.roomId,
            message: chatText,
            pending_stamp: pendingStamp,
        });
    };

    doRefresh = () => {
        this.props.setMessages(this.props.message.roomId, []);
        this.props.setRoomId(this.props.message.roomId);
    };

    openLink = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };

    pickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            includeBase64: true,
            mediaType: 'photo',
        }).then(async images => {
            await this.setState({imageUploading: true});
            let chatText = '';
            for (let image of images) {
                const res = await uploadToImgur(image);
                if (res) {
                    await this.setState({chatText: 'image:' + res.link});
                    this.sendMessage();
                }
            }
            await this.setState({imageUploading: false});
        });
    };

    onTyping = (value) => {
        this.setState({chatText: value});
    };

    renderItem = (item) => {
        let messageElement = null;
        if (item.message.startsWith('image:')) {
            const link = item.message.replace('image:', '');
            messageElement = (
                <TouchableOpacity onPress={() => this.openLink(link)}>
                    <Layout style={{...style.messageText, height: 300, flexDirection: 'row'}}>
                        <Image source={{uri: link}} style={{flex: 1}} resizeMode="contain"/>
                    </Layout>
                </TouchableOpacity>
            );
        } else {
            messageElement = (<Text style={style.messageText}>{item.message}</Text>);
        }

        if (this.props.message.mode === 'multiple') {
            return (
                <Layout style={item.pending_stamp !== 0 ? style.pendingMessage : style.message}>
                    <Avatar style={style.messageAvatar} source={{uri: item.user.avatar}}/>
                    <Layout style={style.messageContent}>
                        <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={style.messageName} category="s1">{item.user.display_name}</Text>
                            <Text appearance="hint"
                                  category="c1">{moment(item.updated_at).format("HH:mm:ss DD/MM/YYYY")}</Text>
                        </Layout>
                        {messageElement}
                    </Layout>
                </Layout>
            );
        } else {
            return null;
        }
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        // console.log(this.props.message);
    }

    render() {
        const room_id = this.props.message.roomId;
        let messages;
        if (room_id && this.props.message.messages[room_id]) {
            messages = this.props.message.messages[room_id];
        } else {
            messages = {
                loaded: false,
                data: [],
            };
        }

        return (
            <Layout style={style.tab}>
                {this.props.message.roomId ?
                    <>
                        <ScrollView ref={ref => this.scrollView = ref}
                                    onContentSizeChange={(contentWidth, contentHeight) => {
                                        this.scrollView.scrollToEnd({animated: true});
                                    }}
                                    refreshControl={<RefreshControl refreshing={this.props.message.refreshing}
                                                                    onRefresh={this.doRefresh}/>}
                        >
                            <Layout style={style.container}>
                                {messages.data.map(this.renderItem)}
                            </Layout>
                        </ScrollView>
                        <Layout style={style.typingArea}>
                            {this.state.imageUploading ?
                                <Layout style={{padding: 8, margin: 8}}>
                                    <Spinner size='medium'/>
                                </Layout>
                                :
                                <Button appearance="ghost" status="primary" icon={ImageIcon} onPress={this.pickImage}/>
                            }
                            <Input style={style.textInput} onChangeText={this.onTyping} value={this.state.chatText}
                                   size="small"
                                   onSubmitEditting={this.sendMessage}
                                   placeholder="Nhập gì đó để chat..."
                            />
                            <Button appearance="ghost" status="primary" icon={SendIcon} onPress={this.sendMessage}/>
                        </Layout>
                    </>
                    : <Text style={{flex: 1, margin: 10}}>Chọn một liên hệ / phòng chat để bắt đầu.</Text>
                }
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    tab: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }, container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    }, message: {
        flex: 1,
        flexDirection: 'row',
    }, pendingMessage: {
        flex: 1,
        flexDirection: 'row',
        opacity: 0.5,
    }, messageAvatar: {
        marginTop: 10,
    }, messageContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginBottom: 5,
    }, messageName: {
        fontWeight: 'bold',
        marginRight: 5,
    }, messageText: {
        flex: 1,
    }, typingArea: {
        flexDirection: 'row',
        padding: 3,
    }, textInput: {
        flex: 1,
        borderRadius: 10,
        paddingBottom: 0,
        marginBottom: 0,
    }, image: {
        width: '100',
        height: '200',
    }
});

const mapStateToProps = state => {
    return {
        user: state.user,
        message: state.message,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        pushMessage: (room_id, message) => dispatch(pushMessage(room_id, message)),
        setMessages: (room_id, messages) => dispatch(setMessages(room_id, messages)),
        setRoomId: roomId => dispatch(setRoomId(roomId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageTab);
