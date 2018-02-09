import React, {Component} from "react";
import MainBalance from "./mainbalance";
import {View} from "react-native"

class BalanceHeader extends React.Component {

    render() {
        return (

            <View style={{flex:1, flexDirection:'row'}}>
                <MainBalance
                        title={this.props.titleLeft}
                        balance={this.props.balanceLeft}
                        currency={this.props.currencyLeft}></MainBalance>
                <MainBalance
                    title={this.props.titleRight}
                    balance={this.props.balanceRight}
                    currency={this.props.currencyRight}></MainBalance>
            </View>

        );
    }
}





export default BalanceHeader;