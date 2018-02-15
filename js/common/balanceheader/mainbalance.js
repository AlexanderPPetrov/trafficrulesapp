import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import {
    Text
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Ui from '../ui';
import CurrencyIcon from '../currency/currency';
import ColorScheme from '../colorscheme';

class SafeBalance extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={Ui.mainBalanceContainer}>
                <Text style={Ui.balanceHeader}>
                    {this.props.title}
                </Text>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'center'}}>
                    {/*<CurrencyIcon color={ColorScheme.mainCurrencyColor} size={26} currency={this.props.currency}/>*/}
                    <Text style={Ui.mainBalanceValue}>
                        {this.props.balance}
                    </Text>
                    <Text style={{paddingBottom:5, paddingLeft:5}}>{this.props.currency}</Text>
                </View>
            </View>

        );
    }
}

export default SafeBalance;
