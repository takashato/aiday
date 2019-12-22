import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Input, Layout, Text} from "react-native-ui-kitten";
import {ScrollView} from "react-navigation";

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
        ]
    };

    renderItem = (item) => {
        return (
            <Layout style={style.message}>
                <Avatar style={style.messageAvatar} source={{uri: item.avatar}}/>
                <Layout style={style.messageContent}>
                    <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={style.messageName} category="S1">{item.full_name}</Text>
                        <Text appearance="hint" category="c1">{item.time}</Text>
                    </Layout>
                    <Text style={style.messageText}>{item.message}</Text>
                </Layout>
            </Layout>
        );
    };

    render() {
        return (
            <Layout style={style.tab}>
                <ScrollView>
                    <Layout style={style.container}>
                        {this.state.data.map(this.renderItem)}
                    </Layout>
                </ScrollView>
                <Layout>
                    <Input/>
                </Layout>
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
    }, messageText: {}
});

export default MessageTab;