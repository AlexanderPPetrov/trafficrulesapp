import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import {TabNavigator, TabBarTop} from "react-navigation";
import OpenBets from "./openbets";
import SettledBets from "./settledbets";
import ColorScheme from "../../common/colorscheme";
import Ui from '../../common/ui';

const indicatorStyle = (props, alignSelf) => ({
    backgroundColor: props.indicatorStyle.backgroundColor,
    alignSelf: 'flex-end',
});


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
    tabBarComponent: (props)=> <TabBarTop {...props} indicatorStyle={indicatorStyle(props, 'flex-end')} />,
    tabBarOptions: Ui.tabsStyle
})

export default () => <Tabs/>;