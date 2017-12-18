import React, { Component } from "react";
import { View, Modal, Platform, Animated, ViewPropTypes, Text } from "react-native";


class Preloader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preloaderVisible: false
        };
    }
    static preloaderInstance;


    static show = () => {
        //TODO figure out how to get instance
        //Nativebase did it with toast
        console.log('###########',preloaderInstance)
       // this._wrapper.preloaderInstance.showPreloader()
    }
    static hide = () => {
     //   this._wrapper.preloaderInstance.hidePreloader()
    }
    hidePreloader (){
        this.setState({
            preloaderVisible: true
        })
    }

    showPreloader (){
        this.setState({
            preloaderVisible: true
        })
    }

    render() {
        if (this.state.preloaderVisible) {
            return (
                <Text></Text>
            );
        } else return null;
    }
}

export { Preloader };
