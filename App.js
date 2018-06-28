import React from "react";
import {SafeAreaView, WebView, StatusBar, StyleSheet, View, AppState, ScrollView, Image, Text, Dimensions, RefreshControl, TouchableOpacity} from "react-native";
import {CircleSnail} from 'react-native-progress';
import { Constants } from 'expo';


const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: "#000",
        height: Constants.statusBarHeight,
    },

    blackOverlay: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        elevation: 9,
        zIndex:999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black'
    }

    // rest of the styles
});

const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');

const addOnload = `
        document.body.classList.add("webview");
    `;

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            opacity:0,
            isReady: false,
            appState: AppState.currentState,
            errorLoading:false,
            width:deviceWidth*0.4
        }
    }
    cacheImages = (images) =>{
        return images.map(image => {
            if (typeof image === 'string') {
                return Image.prefetch(image);
            } else {
                return Expo.Asset.fromModule(image).downloadAsync();
            }
        });
    }

    componentDidMount = async () => {

        console.disableYellowBox = true;

        await Expo.Font.loadAsync({
            Roboto_light: require('./fonts/Roboto-Light.ttf'),
        });

        const imageAssets = this.cacheImages([
            require('./img/logo.png'),
        ]);

        await Promise.all([...imageAssets]);

        this.setState({isReady: true});

        AppState.addEventListener('change', this._handleAppStateChange);

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.reloadWebView();
        }
        this.setState({appState: nextAppState});

    }

    reloadWebView = () => {
        this.refs.webview.reload();
        this.setState({
            opacity:0,
            errorLoading: false
        })

        console.log('reload')
    }


    getPreloader = () => {
        if(this.state.opacity){
            return null;
        }
        if(this.state.errorLoading){
            return <View  style={[styles.blackOverlay, {paddingLeft:15, paddingRight:15}]} >
                <TouchableOpacity
                    onPress={() => {
                        this.reloadWebView()

                    }}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    <Image style={{
                        width: this.state.width,
                        height: this.state.width*0.2411764705882353}}
                           source={require('./img/logo.png')}
                    />
                    <Text style={{fontFamily:'Roboto_light', fontSize:18, color:'#f5b906', textAlign:'center', marginTop:20}}>Check your connection and try again</Text>
                </TouchableOpacity>

            </View>
        }
        return  <View pointerEvents="none" style={styles.blackOverlay}>
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
                 ref={ 'webview' }
                source={{uri: "http://www.18bet.com/"}}
                javaScriptEnabled={true}

                style={{
                    flex:1,
                    width:'100%',
                    opacity: this.state.opacity
                }}
                startInLoadingState={false}
                injectedJavaScript={addOnload}
                onLoad={()=> {
                    this.setState({
                        errorLoading:false,
                        opacity:1
                    })
                }}
                 onError={()=>{
                     this.setState({
                         errorLoading:true
                     })
                 }}
            />

            {this.getPreloader()}
        </SafeAreaView>
    };
}
