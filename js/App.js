import React from "react";
import {StyleProvider, Root, Text} from "native-base";
import {StackNavigator} from "react-navigation";

import Drawer from "./Drawer";
import Landing from "./screens/landing/";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import Loader from "./common/loader/index";
import PinModal from "./common/pinmodal/pinmodal";

import Controller from '../Controller';
import Notifications from "./common/notifications/index";
import Chat from "./common/chat/index";

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
        if(this.props.exp.unreadNotifications){
            Controller.unreadNotifications = this.props.exp.unreadNotifications;
            Controller.unseenNotifications = Controller.unreadNotifications.length;
        }
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
                <Notifications/>
                <Chat/>
            </Root>
        );
    }
}
export default AppRoot

