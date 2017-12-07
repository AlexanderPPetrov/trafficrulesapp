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
        Drawer: { screen: Drawer },
        Home: {screen: Home},
        MyAccount: {screen: MyAccount},
        Accounts: {screen: Accounts},
        PreviousBalance: {screen: PreviousBalance},

    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <StyleProvider style={getTheme(material)}>
            <AppNavigator />
        </StyleProvider>
    </Root>;
