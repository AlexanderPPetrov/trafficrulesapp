import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import {TabNavigator} from "react-navigation";
import OpenBets from "./openbets";
import SettledBets from "./settledbets";
import ColorScheme from "../../common/colorscheme";

import {
    Image,
    Button,
    StyleSheet
} from "react-native";


class OpenBetsTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: I18n.t('openBets')
    };

    render() {
        return (
            <OpenBets></OpenBets>
        );
    }
}

class SettledBetsTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: I18n.t('settledBets')
    };

    render() {
        return (
            <SettledBets></SettledBets>
        );
    }
}



const Tabs = TabNavigator({
    OpenBets: {
        screen: OpenBetsTab,
    },
    SettledBets: {
        screen: SettledBetsTab,
    },
}, {
    tabBarPosition: 'top',
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