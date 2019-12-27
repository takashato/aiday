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
import {setTabIndex, setToken, setUser} from "../../redux/actions/user";
import {setAppMainTitle, setAppTheme, setChatTitle} from "../../redux/actions/app";
import UserTab from "../tabs/UserTab";

// const MenuIcon = (style) => (<Icon {...style} name="menu"/>);
const PeopleIcon = (style) => (<Icon {...style} name="people"/>);
const MessageIcon = (style) => (<Icon {...style} name="message-square"/>);
const UserIcon = (style) => (<Icon {...style} name="person"/>);
const GlobeIcon = (style) => (<Icon {...style} name="globe-2"/>);
const MenuIcon = (style) => (<Icon {...style} name='more-vertical'/>);
const LogoutIcon = (style) => (<Icon {...style} name='log-out'/>);
const SettingIcon = (style) => (<Icon {...style} name='settings'/>);
const FlipIcon = (style) => (<Icon {...style} name='flip'/>);


class MainScreen extends React.Component {
    static navigationOptions = {header: null};

    state = {
        selectedTabIndex: null,
        menuVisible: false,
    };

    menuData = [
        {
            key: 'change_theme',
            title: 'Chế độ sáng / tối',
            icon: FlipIcon,
        },
        {
            key: 'logout',
            title: 'Đăng xuất',
            icon: LogoutIcon,
        }
    ];

    renderLeftControl = () => (null);

    renderRightControl = () => (
        <OverflowMenu visible={this.state.menuVisible} data={this.menuData} onBackdropPress={this.toggleMenu}
                      onSelect={this.handleMenuItemSelect}>
            <TopNavigationAction icon={MenuIcon} onPress={this.toggleMenu}/>
        </OverflowMenu>
    );

    handleMenuItemSelect = async (index) => {
        if (this.menuData[index].key === 'logout') {
            await this.toggleMenu();
            this.props.setToken(null);
            return;
        }
        if (this.menuData[index].key === 'change_theme') {
            const newTheme = this.props.app.theme === 'dark' ? 'light' : 'dark';
            this.props.setAppTheme(newTheme);
        }
    };

    toggleMenu = async () => {
        await this.setState({menuVisible: !this.state.menuVisible});
    };

    handleSelectTab = (index) => {
        if (index === 0) {
            this.props.setAppMainTitle('Liên hệ');
        } else if (index === 1) {
            this.props.setAppMainTitle('Phòng chat');
        } else if (index === 2) {
            this.props.setAppMainTitle(this.props.app.chatTitle);
        } else if (index === 3) {
            this.props.setAppMainTitle('Thông tin');
        }
        this.props.setTabIndex(index);
    };

    componentDidMount(): void {
        this.props.setAppMainTitle("Liên hệ");
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title={this.props.app.title} titleStyle={{fontWeight: 'bold'}}
                               leftControl={this.renderLeftControl()} rightControls={this.renderRightControl()}/>
                <Layout level="2" style={{flex: 1}}>
                    <TabView style={{flex: 1}} selectedIndex={this.props.user.tabIndex}
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
                            <UserTab/>
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

const mapStateToProps = state => (
    {
        app: state.app,
        user: state.user
    }
);
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setToken: token => dispatch(setToken(token)),
        setTabIndex: tabIndex => dispatch(setTabIndex(tabIndex)),
        setAppTheme: theme => dispatch(setAppTheme(theme)),
        setAppMainTitle: title => dispatch(setAppMainTitle(title)),
        setChatTitle: title => dispatch(setChatTitle(title)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
