import React from 'react';
import {SafeAreaView} from "react-navigation";
import {Drawer} from "react-native-ui-kitten";

class MainNavigator extends React.Component {
    render() {
        return (
        <SafeAreaView>
            <Drawer data={[{ title: 'Home' }, { title: 'Settings' }]} onSelect={onSelect} />
        </SafeAreaView>
        );
    };
}

export default MainNavigator;