import Expo from "expo";
import React from "react";
import {SafeAreaView} from "react-native";
import App from "./js/App";
import ColorScheme from "./js/common/colorscheme";

export default class App1 extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
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

        //suppress warnings and errors
        console.disableYellowBox = true;
        // console.error = (error) => error.apply;

        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Roboto_bold: require("native-base/Fonts/Roboto_bold.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            MaterialCommunityIcons: require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf"),
            Roboto_light: require('./fonts/Roboto-Light.ttf'),
        });

        const imageAssets = this.cacheImages([
            require('./img/menu_background.png'),
            require('./img/login_background.png')
        ]);

        await Promise.all([...imageAssets]);

       this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return <SafeAreaView style={{flex: 1, backgroundColor: ColorScheme.headerBackground}}>
            <App exp={this.props.exp}/>
        </SafeAreaView>
    };
}
