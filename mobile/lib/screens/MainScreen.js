import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {Layout, Text, TopNavigation, TopNavigationAction} from "react-native-ui-kitten";

const MenuIcon = (style) => (<Icon {...style} name="menu"/>);

class MainScreen extends React.Component {
    static navigationOptions = {header: null};

    renderLeftControl = () => (<TopNavigationAction icon={MenuIcon}/>);

    render() {
        return (
            <Layout style={{flex: 1}}>
                <TopNavigation title="Ai Đấy?" subTitle="#Rezonia" leftControl={this.renderLeftControl()}/>
                <Layout level='2' style={{flex: 1}}>
                    <Text>???</Text>
                </Layout>
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default MainScreen;