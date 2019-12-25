import React from 'react';
import {StyleSheet, ScrollView, Keyboard} from 'react-native';
import {Avatar, Button, Input, Layout, Text} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import {connect} from "react-redux";
import getSocket from "../../net/socketio";

class MessageTab extends React.Component {
    state = {
        data: [
            {
                'avatar': 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
                'full_name': 'Bành Thanh Sơn',
                'message': 'Xin chào!!!',
                'time': '22:48 22/12/2019',
            },
            {
                'avatar': 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
                'full_name': 'Bành Thanh Sơn',
                'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod laoreet libero a cursus. Nulla elementum varius tortor, auctor efficitur sapien facilisis et. Proin non turpis purus. Nam id cursus sapien, et condimentum tellus. Cras arcu tellus, gravida vitae tempus vel, interdum sit amet sem. Nulla facilisi. Curabitur mi nunc, pellentesque at ante vitae, auctor hendrerit lorem. Nunc quis varius sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec facilisis, nunc sed commodo vulputate, risus turpis semper felis, eget semper mi nisi eget erat. Fusce vitae nisl in ante suscipit tristique.',
                'time': '22:48 22/12/2019',
            }, {
                'avatar': 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
                'full_name': 'Bành Thanh Sơn',
                'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod laoreet libero a cursus. Nulla elementum varius tortor, auctor efficitur sapien facilisis et. Proin non turpis purus. Nam id cursus sapien, et condimentum tellus. Cras arcu tellus, gravida vitae tempus vel, interdum sit amet sem. Nulla facilisi. Curabitur mi nunc, pellentesque at ante vitae, auctor hendrerit lorem. Nunc quis varius sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec facilisis, nunc sed commodo vulputate, risus turpis semper felis, eget semper mi nisi eget erat. Fusce vitae nisl in ante suscipit tristique.',
                'time': '22:48 22/12/2019',
            }, {
                'avatar': 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
                'full_name': 'Bành Thanh Sơn',
                'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod laoreet libero a cursus. Nulla elementum varius tortor, auctor efficitur sapien facilisis et. Proin non turpis purus. Nam id cursus sapien, et condimentum tellus. Cras arcu tellus, gravida vitae tempus vel, interdum sit amet sem. Nulla facilisi. Curabitur mi nunc, pellentesque at ante vitae, auctor hendrerit lorem. Nunc quis varius sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec facilisis, nunc sed commodo vulputate, risus turpis semper felis, eget semper mi nisi eget erat. Fusce vitae nisl in ante suscipit tristique.',
                'time': '22:48 22/12/2019',
            }, {
                'avatar': 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
                'full_name': 'Bành Thanh Sơn',
                'message': 'Textssssss.',
                'time': '22:48 22/12/2019',
            },
        ],
        chatText: '',
    };

    componentDidMount(): void {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    }

    componentWillUnmount(): void {
        this.keyboardDidShowListener.remove();
    }

    keyboardDidShow = () => {
        this.scrollView.scrollToEnd({animated: true});
    };

    sendMessage = async () => {
        if (!this.state.chatText || this.state.chatText === '') return;
        const {chatText} = this.state;
        this.setState({chatText: ''});
        getSocket().emit('push message', {
            room_id: this.props.message.roomId,
            message: chatText,
        });
    };

    onTyping = (value) => {
        this.setState({chatText: value});
    };

    renderItem = (item) => {
        return (
            <Layout style={style.message}>
                <Avatar style={style.messageAvatar} source={{uri: item.avatar}}/>
                <Layout style={style.messageContent}>
                    <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={style.messageName} category="s1">{item.user.display_name}</Text>
                        <Text appearance="hint" category="c1">{item.updated_at}</Text>
                    </Layout>
                    <Text style={style.messageText}>{item.message}</Text>
                </Layout>
            </Layout>
        );
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        // console.log(this.props.message);
    }

    render() {
        const SendIcon = style => (<Icon {...style} name="paper-plane"/>);
        const room_id = this.props.message.roomId;
        let messages = [];
        if (room_id) {
            if (this.props.message.messages[room_id]) {
                messages = this.props.message.messages[room_id];
            }
        }

        return (
            <Layout style={style.tab}>
                {this.props.message.roomId ?
                    <>
                        <ScrollView ref={ref => this.scrollView = ref}
                                    onContentSizeChange={(contentWidth, contentHeight) => {
                                        this.scrollView.scrollToEnd({animated: true});
                                    }}>
                            <Layout style={style.container}>
                                {messages.map(this.renderItem)}
                            </Layout>
                        </ScrollView>
                        <Layout style={style.typingArea}>
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
    }, messageText: {}, typingArea: {
        flexDirection: 'row',
        padding: 3,
    }, textInput: {
        flex: 1,
        borderRadius: 10,
        paddingBottom: 0,
        marginBottom: 0,
    }
});

const mapStateToProps = state => {
    return {
        message: state.message,
    }
};

export default connect(mapStateToProps)(MessageTab);
