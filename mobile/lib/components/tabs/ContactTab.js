import React from 'react';
import {List, ListItem} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";

const PersonIcon = (style) => (<Icon {...style} name="person"/>);

class ContactTab extends React.Component {
    state = {
        data: [
            {
                username: 'takashato',
                full_name: 'Bành Thanh Sơn',
            }, {
                username: 'kawakashi',
                full_name: 'Phạm Trần Chính'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            }, {
                username: 'user',
                full_name: 'Người dùng'
            },
        ],
    };

    renderItem = ({item, index}) => {
        return (
            <ListItem title={item.username} description={item.full_name} icon={PersonIcon}/>
        );
    };

    render() {

        return (
            <List data={this.state.data} renderItem={this.renderItem}/>
        );
    }
}

export default ContactTab;