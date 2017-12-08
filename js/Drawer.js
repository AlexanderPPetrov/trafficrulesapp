/* @flow */

import React from "react";
import {DrawerNavigator} from "react-navigation";

import Home from "./components/home/";
import MyAccount from "./components/myaccount/";
import Accounts from "./components/accounts/";
import PreviousBalance from "./components/previousbalance/";


import SideBar from "./components/sidebar";


const DrawerExample = DrawerNavigator(
    {
        Home: {screen: Home},
        MyAccount: {screen: MyAccount},
        Accounts: {screen: Accounts},
        PreviousBalance: {screen: PreviousBalance},
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

export default DrawerExample;
