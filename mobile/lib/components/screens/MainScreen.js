import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, ScrollView} from "react-navigation";
import {Icon} from 'react-native-eva-icons';
import {Divider, Layout, Tab, TabView, Text, TopNavigation, TopNavigationAction} from "react-native-ui-kitten";
import ContactTab from "../tabs/ContactTab";
import CommunityTab from "../tabs/CommunityTab";
import MessageTab from "../tabs/MessageTab";

const MenuIcon = (style) => (<Icon {...style} name="menu"/>);
const PeopleIcon = (style) => (<Icon {...style} name="people"/>);
const MessageIcon = (style) => (<Icon {...style} name="message-square"/>);
const UserIcon = (style) => (<Icon {...style} name="person"/>);
const GlobeIcon = (style) => (<Icon {...style} name="globe-2"/>);

class MainScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        selectedTabIndex: null,
    };

    renderLeftControl = () => (<TopNavigationAction icon={MenuIcon}/>);

    handleSelectTab = (index) => this.setState({selectedTabIndex: index});

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Ai Đấy?" subTitle="#Rezonia" leftControl={this.renderLeftControl()}/>
                <Layout level="2" style={{flex: 1}}>
                    <TabView style={{flex: 1}} selectedIndex={this.state.selectedTabIndex} onSelect={this.handleSelectTab}>
                            <Tab icon={PeopleIcon}>
                                <ContactTab/>
                            </Tab>
                            <Tab icon={GlobeIcon}>
                                <CommunityTab/>
                            </Tab>
                            <Tab icon={MessageIcon}>
                                <MessageTab/>
                            </Tab>
                            <Tab icon={UserIcon}>
                                <Text>Người dùng</Text>
                            </Tab>
                    </TabView>
                </Layout>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default MainScreen;