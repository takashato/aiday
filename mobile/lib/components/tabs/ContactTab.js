import React from 'react';
import {RefreshControl} from 'react-native';
import {List, ListItem} from "react-native-ui-kitten";
import {Icon} from "react-native-eva-icons";
import getSocket from "../../net/socketio";
import {connect} from "react-redux";

const PersonIcon = (style) => (<Icon {...style} name="person"/>);

class ContactTab extends React.Component {
    state = {
        refreshing: false,
    };

    renderItem = ({item, index}) => {
        return (
            <ListItem title={item.username} description={item.display_name} icon={PersonIcon}/>
        );
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
            <List data={this.props.contactList.list} renderItem={this.renderItem}
                  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.doRefresh}/>}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        contactList: state.contactList,
    }
};

export default connect(mapStateToProps)(ContactTab);
