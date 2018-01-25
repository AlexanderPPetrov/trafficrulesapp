/* @flow */

import React from "react";
import {DrawerNavigator} from "react-navigation";

import Home from "./components/home/";
import MyAccount from "./components/myaccount/";
import Accounts from "./components/accounts/";
import PreviousBalance from "./components/previousbalance/";
import Brokerage from "./components/brokerage/";
import Deposit from "./components/deposit/";
import Withdraw from "./components/withdraw/";

import FundsTransfer from "./components/fundstransfer/";
import Transactions from "./components/transactions/";
import SendMoney from "./components/sendmoney/";


import SideBar from "./components/sidebar";


const DrawerExample = DrawerNavigator(
    {
        MyAccount: {screen: MyAccount},
        Accounts: {screen: Accounts},
        PreviousBalance: {screen: PreviousBalance},
        Brokerage: {screen: Brokerage},
        Deposit: {screen: Deposit},
        Withdraw: {screen: Withdraw},
        FundsTransfer: {screen: FundsTransfer},
        Transactions: {screen: Transactions},
        SendMoney: {screen: SendMoney},
    },
    {
        initialRouteName: "MyAccount",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

export default DrawerExample;
