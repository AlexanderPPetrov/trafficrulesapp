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
import {Preloader} from "./common/preloader/index";

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
        {/*<Preloader ref={c => {*/}
            {/*if (!Preloader.preloaderInstance) Preloader.preloaderInstance = c;*/}
        {/*}}/>*/}
        <StyleProvider style={getTheme(material)}>
            <AppNavigator />
        </StyleProvider>
    </Root>;
