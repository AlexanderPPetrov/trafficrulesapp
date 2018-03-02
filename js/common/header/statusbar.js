import React, { Component } from "react";
import { StatusBar } from "react-native";
import ColorScheme from "../colorscheme";

class StatusBarWrapper extends Component {

    render() {
        return <StatusBar hidden={true} barStyle="light-content" backgroundColor={ColorScheme.statusBarBackground}/>
    }
}

export default StatusBarWrapper;
