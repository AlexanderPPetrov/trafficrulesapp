/* @flow */

import React from "react";

import {View} from "react-native";
import {StyleProvider, Root, Text} from "native-base";
import {StackNavigator} from "react-navigation";

import Drawer from "./Drawer";
import Home from "./components/home/";
import SetPin from "./components/setpin/";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import Loader from "./common/loader/index";

import Api from '../Api';

const AppNavigator = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        SetPin: {
            screen: SetPin,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Drawer: {
            screen: Drawer
        }

    },
    {
        initialRouteName: "Home",
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
                        Api.setNavigator(navigatorRef);
                    }}/>
                </StyleProvider>
            </Root>
        );
    }
}
export default AppRoot

