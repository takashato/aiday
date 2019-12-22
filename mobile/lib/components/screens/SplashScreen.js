import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Spinner, Text} from "react-native-ui-kitten";

class SplashScreen extends React.Component {
    render() {
        return (
            <Layout style={style.container}>
                <Spinner size="giant"/>
                <Text category="h6" style={{marginTop: 20, }}>ĐANG TẢI...</Text>
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SplashScreen;

