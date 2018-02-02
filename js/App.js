/* @flow */

import React from "react";

import {View} from "react-native";
import {StyleProvider, Root, Text} from "native-base";
import {StackNavigator} from "react-navigation";

import Drawer from "./Drawer";
import Landing from "./screens/landing/";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import Loader from "./common/loader/index";
import PinModal from "./common/pinmodal/pinmodal";

import Controller from '../Controller';
import NotificationsHandler from "./common/notifications/index";

const AppNavigator = StackNavigator(
    {
        Landing: {
            screen: Landing,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Drawer: {
            screen: Drawer,
            navigationOptions: { header: null }
        }

    },
    {
        initialRouteName: "Landing",
        headerMode: "none",
    }
);

class AppRoot extends React.Component {
    constructor(props)  {
        super(props);
    }
    render() {
        return (
            <Root>
                <Loader/>
                <StyleProvider style={getTheme(material)}>
                    <AppNavigator ref={navigatorRef => {
                        Controller.setNavigator(navigatorRef);
                    }}/>
                </StyleProvider>
                <PinModal ref={pinModal => {
                    Controller.setPinModal(pinModal);
                }}/>
                <NotificationsHandler/>
            </Root>
        );
    }
}
export default AppRoot

