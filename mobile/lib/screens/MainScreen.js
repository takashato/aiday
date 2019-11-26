import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text} from "react-native-ui-kitten";

class MainScreen extends React.Component {
    static navigationOptions = {header: null};

    render() {
        return (
            <Layout style={style.screen}>
                <Text>???</Text>
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