/* @flow */

import React from "react";

import { Platform } from "react-native";
import { StyleProvider,Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Home from "./components/home/";
import MyAccount from "./components/myaccount/";
import Accounts from "./components/accounts/";
import PreviousBalance from "./components/previousbalance/";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

const AppNavigator = StackNavigator(
    {
        Home: {screen: Home},
        Drawer: { screen: Drawer }

    },
    {
        initialRouteName: "Home",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <StyleProvider style={getTheme(material)}>
            <AppNavigator />
        </StyleProvider>
    </Root>;
