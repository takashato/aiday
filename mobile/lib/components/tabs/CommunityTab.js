import React from 'react';
import {List} from "react-native-ui-kitten";
import {ListItem} from "react-native-ui-kitten/ui/list/listItem.component";
import {Icon} from "react-native-eva-icons";

const PeopleIcon = (style) => (<Icon {...style} name="people"/>);

class CommunityTab extends React.Component {
    state = {
        data: [
            {
                name: 'Phòng chat 1',
                description: 'Đây là phòng chat mẫu 1',
            }, {
                name: 'Phòng chat mẫu',
                description: 'Đây là phòng chat mẫu 2',
            },
        ],
    };

    renderItem = ({item, index}) => {
        return (
            <ListItem title={item.name} description={item.description} icon={PeopleIcon}/>
        );
    };

    render() {
        return (
            <List data={this.state.data} renderItem={this.renderItem}/>
        );
    }
}

export default CommunityTab;