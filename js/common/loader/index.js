import React, {Component} from "react";
import {View, ActivityIndicator, Text} from "react-native";
import ColorScheme from "../colorscheme";
let loaderInstance = null;

class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderVisible: false
        };
        loaderInstance = this;
    }

    static show = () => {
        loaderInstance.showLoader()
    }
    static hide = () => {
        loaderInstance.hideLoader()
    }

    hideLoader() {
        this.setState({
            loaderVisible: false
        })
    }

    showLoader() {
        this.setState({
            loaderVisible: true
        })
    }

    render() {
        if (this.state.loaderVisible) {
            return (
            <View pointerEvents="none" style={{
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
                <ActivityIndicator size="small" color={ColorScheme.loader} />
            </View>
        )}

        return null;
    }
}

export default Loader;
