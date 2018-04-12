import React from "react";
import {SafeAreaView, WebView, StatusBar, StyleSheet, View} from "react-native";
import {CircleSnail} from 'react-native-progress';
import { Constants } from 'expo';


const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: "#000",
        height: Constants.statusBarHeight,
    },

    // rest of the styles
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            opacity:0,
            isReady: false
        }
    }

    componentDidMount = async () => {

        console.disableYellowBox = true;
        this.setState({isReady: true});


    }

    getPreloader = () => {
        if(this.state.opacity){
            return null;
        }
        return            <View pointerEvents="none" style={{
            position: 'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            elevation: 9,
            zIndex:999,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircleSnail size={60}  color={['#f5b906']} thickness={3} />
        </View>

    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return <SafeAreaView bounces={false} style={{flex: 1, backgroundColor: '#000', width:'100%'}}>
            <StatusBar barStyle="light-content" backgroundColor={'#000'}/>
            <View style={styles.statusBar} />
            <WebView bounces={false}
                source={{uri: "http://www.18bet.com/"}}
                style={{
                    flex:1,
                    width:'100%',
                    opacity: this.state.opacity
                }}
                onLoadEnd={()=> {
                    this.setState({
                        opacity:1
                    })
                }}
            />

            {this.getPreloader()}
        </SafeAreaView>
    };
}
