import Expo from "expo";
import React from "react";
import {AsyncStorage, Alert} from "react-native";
import App from "./js/App";
import I18n from './i18n/i18n';
import Api from './Api';
export default class App1 extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }



    componentDidMount = async () => {

        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Roboto_bold: require("native-base/Fonts/Roboto_bold.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            Roboto_light: require('./fonts/Roboto-Light.ttf'),
        });

       this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return <App exp={this.props.exp}/>;
    }
}
