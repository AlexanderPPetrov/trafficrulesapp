import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Balance from "./balance";
import BalanceHeader from "../../common/balanceheader/balanceheader";
import {View, ScrollView, RefreshControl} from "react-native"

class MainBalance extends Component {

    getBalanceList = () => {
        if (this.props.loaded) {
            return <View style={{flexDirection: 'column', flex: 1, alignItems: 'stretch', marginTop: 1}}>
                <Balance balances={this.props.balances}></Balance>
            </View>
        }
        return null
    }

    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                />
            }>
                <BalanceHeader
                    balanceLeft={this.props._payload._safe_balance}
                    currencyLeft={this.props._payload._currency}
                    titleLeft={I18n.t('safeBalance')}
                    balanceRight={this.props._payload._brokerage_balance}
                    currencyRight={this.props._payload._brokerage_currency}
                    titleRight={I18n.t('brokerageBalance')}
                />
                {this.getBalanceList()}

            </ScrollView>

        );
    }
}


export default MainBalance;