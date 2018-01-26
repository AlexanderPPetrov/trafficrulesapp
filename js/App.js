/* @flow */

import React from "react";

import {Platform} from "react-native";
import {StyleProvider, Root} from "native-base";
import {StackNavigator} from "react-navigation";

import Drawer from "./Drawer";
import Home from "./components/home/";
import SetPin from "./components/setpin/";
import Accounts from "./components/accounts/";
import PreviousBalance from "./components/previousbalance/";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import Loader from "./common/loader/index";

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

export default () =>
    <Root>
        <Loader/>
        <StyleProvider style={getTheme(material)}>
            <AppNavigator/>
        </StyleProvider>
    </Root>;
