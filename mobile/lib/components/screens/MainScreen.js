import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, ScrollView} from "react-navigation";
import {Icon} from 'react-native-eva-icons';
import {
    Divider,
    Layout,
    OverflowMenu,
    Tab,
    TabView,
    Text,
    TopNavigation,
    TopNavigationAction
} from "react-native-ui-kitten";
import ContactTab from "../tabs/ContactTab";
import CommunityTab from "../tabs/CommunityTab";
import MessageTab from "../tabs/MessageTab";
import {connect} from "react-redux";
import {setUser} from "../../redux/actions/user";

// const MenuIcon = (style) => (<Icon {...style} name="menu"/>);
const PeopleIcon = (style) => (<Icon {...style} name="people"/>);
const MessageIcon = (style) => (<Icon {...style} name="message-square"/>);
const UserIcon = (style) => (<Icon {...style} name="person"/>);
const GlobeIcon = (style) => (<Icon {...style} name="globe-2"/>);
const MenuIcon = (style) => (<Icon {...style} name='more-vertical'/>);
const LogoutIcon = (style) => (<Icon {...style} name='log-out'/>);
const SettingIcon = (style) => (<Icon {...style} name='settings'/>);

class MainScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        selectedTabIndex: null,
        menuVisible: false,
    };

    menuData = [{
        key: 'logout',
        title: 'Đăng xuất',
        icon: LogoutIcon,
    }];

    renderLeftControl = () => (null);

    renderRightControl = () => (
        <OverflowMenu visible={this.state.menuVisible} data={this.menuData} onBackdropPress={this.toggleMenu} onSelect={this.handleMenuItemSelect}>
            <TopNavigationAction icon={MenuIcon} onPress={this.toggleMenu}/>
        </OverflowMenu>
    );

    handleMenuItemSelect = async (index) => {
        console.log(index);
        if (this.menuData[index].key === 'logout') {
            await this.toggleMenu();
            this.props.setUser(null);
        }
    };

    toggleMenu = async () => {
        await this.setState({menuVisible: !this.state.menuVisible});
    };

    handleSelectTab = (index) => this.setState({selectedTabIndex: index});

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title="Aiday - Chat app" titleStyle={{fontWeight: 'bold'}}
                               leftControl={this.renderLeftControl()} rightControls={this.renderRightControl()}/>
                <Layout level="2" style={{flex: 1}}>
                    <TabView style={{flex: 1}} selectedIndex={this.state.selectedTabIndex}
                             onSelect={this.handleSelectTab}>
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

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
