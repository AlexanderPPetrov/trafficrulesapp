/* @flow */

import React from "react";
import {DrawerNavigator} from "react-navigation";

import MyAccount from "./screens/myaccount/";
import Notifications from "./screens/notifications/";
import Accounts from "./screens/accounts/";
import PreviousBalance from "./screens/previousbalance/";
import Brokerage from "./screens/brokerage/";
import Deposit from "./screens/deposit/";
import Withdraw from "./screens/withdraw/";

import FundsTransfer from "./screens/fundstransfer/";
import Transactions from "./screens/transactions/";
import SendMoney from "./screens/sendmoney/";
import Settings from "./screens/settings/";
import WeeklyStatus from "./screens/weeklystatus/";

import Controller from '../Controller';

import HeaderStack from './HeaderStack'

import SideBar from "./screens/sidebar";


const DrawerNavigation = DrawerNavigator(
    {
        MyAccount: {
            screen: HeaderStack
        },
        Notifications: {screen: Notifications},
        Accounts: {screen: HeaderStack},
        PreviousBalance: {screen: PreviousBalance},
        Brokerage: {screen: HeaderStack},
        Deposit: {screen: Deposit},
        Withdraw: {screen: Withdraw},
        FundsTransfer: {screen: FundsTransfer},
        Transactions: {screen: HeaderStack},
        SendMoney: {screen: SendMoney},
        Settings: {screen: Settings},
        WeeklyStatus: {screen: WeeklyStatus},
    },
    {
        initialRouteName: "MyAccount",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props}  ref={navigatorRef => {
            Controller.setSidebar(navigatorRef);
        }}></SideBar>
    }
);

export default DrawerNavigation;
