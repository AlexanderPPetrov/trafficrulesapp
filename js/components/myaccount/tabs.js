import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import {TabNavigator} from "react-navigation";
import Balance from "./balance";
import PieChartBalance from "./piechart";
import ColorScheme from "../../common/colorscheme";

import {
    Image,
    Button,
    StyleSheet
} from "react-native";


class BalanceTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: I18n.t('balances')
    };

    render() {
        return (
            <Balance _payload={this.props._payload}></Balance>
        );
    }
}

class PieChartTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: I18n.t('distribution')
    };

    render() {
        return (
            <PieChartBalance pieChartData={this.props.pieChartData}></PieChartBalance>
        );
    }
}



const Tabs = TabNavigator({
    OpenBets: {
        screen: BalanceTab,
    },
    SettledBets: {
        screen: PieChartTab,
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: ColorScheme.neutralLight,
        inactiveTintColor : ColorScheme.neutralDark,
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: ColorScheme.dark,
        },
        indicatorStyle:{
            backgroundColor:ColorScheme.info
        }
    }
})

export default () => <Tabs/>;