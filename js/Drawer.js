/* @flow */

import React from "react";
import {DrawerNavigator} from "react-navigation";

import Home from "./components/home/";
import MyAccount from "./components/myaccount/";
import Accounts from "./components/accounts/";
import PreviousBalance from "./components/previousbalance/";
import Brokerage from "./components/brokerage/";
import Deposit from "./components/deposit/";
import WithdrawOne from "./components/withdrawone/";
import WithdrawTwo from "./components/withdrawtwo/";
import WithdrawThree from "./components/withdrawthree/";
import WithdrawFour from "./components/withdrawfour/";
import WithdrawFive from "./components/withdrawfive/";
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
        WithdrawOne: {screen: WithdrawOne},
        WithdrawTwo: {screen: WithdrawTwo},
        WithdrawThree: {screen: WithdrawThree},
        WithdrawFour: {screen: WithdrawFour},
        WithdrawFive: {screen: WithdrawFive},
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
