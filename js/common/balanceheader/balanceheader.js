import React, {Component} from "react";
import MainBalance from "./mainbalance";
import {View} from "react-native"
import Ui from "../ui"
class BalanceHeader extends React.Component {

    render() {
        return (

            <View style={[Ui.mainBalanceHeaderContainer, Ui.dropShadow]}>
                <MainBalance
                        title={this.props.titleLeft}
                        balance={this.props.balanceLeft}
                        currency={this.props.currencyLeft}></MainBalance>
                <View style={Ui.verticalSeparator}></View>
                <MainBalance
                    title={this.props.titleRight}
                    balance={this.props.balanceRight}
                    currency={this.props.currencyRight}></MainBalance>
            </View>

        );
    }
}





export default BalanceHeader;