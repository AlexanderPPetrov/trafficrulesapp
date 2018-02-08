import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {TabNavigator, TabBarTop} from "react-navigation";
import Balance from "./balance";
import PieChartBalance from "./piechart";
import SafeBalance from "./safebalance";
import styles from "./styles";
import BrokerageBalance from "./brokeragebalance";
import ColorScheme from "../../common/colorscheme";
import {View, ScrollView, RefreshControl} from "react-native"
import {
    Card

} from "native-base";
import Ui from '../../common/ui';

const indicatorStyle = (props, alignSelf) => ({
    backgroundColor: props.indicatorStyle.backgroundColor,
    alignSelf: 'flex-end',
});


class BalanceTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: I18n.t('balance')
    };

    getBalanceList = () => {
        if (this.props.screenProps.loaded) {
            return <View style={{flexDirection: 'column', flex: 1, alignItems: 'stretch', marginTop: 1}}>
                <Balance balances={this.props.screenProps.balances}></Balance>
            </View>
        }
        return null
    }

    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.props.screenProps.refreshing}
                    onRefresh={this.props.screenProps.onRefresh}
                />
            }>

                <View style={styles.cardBody}>
                    <View style={styles.mainBalanceContainer}>
                        <SafeBalance _safe_balance={this.props.screenProps._payload._safe_balance}
                                     _currency={this.props.screenProps._payload._currency}></SafeBalance>
                    </View>
                    <View style={styles.mainBalanceContainer}>
                        <BrokerageBalance _brokerage_balance={this.props.screenProps._payload._brokerage_balance}
                                          _currency={this.props.screenProps._payload._brokerage_currency}></BrokerageBalance>
                    </View>
                </View>
                {this.getBalanceList()}

            </ScrollView>

        );
    }
}

class PieChartTab extends React.Component {
    static navigationOptions = {
        tabBarLabel: I18n.t('distribution')
    };

    render() {
        return (
            <Card style={styles.cardBody}>
                <PieChartBalance data={this.props.screenProps.data}></PieChartBalance>
            </Card>
        );
    }
}


const TabNavigation = TabNavigator({
    OpenBets: {
        screen: BalanceTab,
    },
    SettledBets: {
        screen: PieChartTab,
    },

}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarComponent: (props)=> <TabBarTop {...props} style={{ backgroundColor:ColorScheme.tabsBackground}} indicatorStyle={indicatorStyle(props, 'flex-end')} />,
    tabBarOptions: Ui.tabsStyle
})

class Tabs extends Component {
    render() {
        return (
            <TabNavigation screenProps={this.props}/>
        )
    }
}

export default Tabs;