import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import {
    Text
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Ui from '../../common/ui';
import CurrencyIcon from '../../common/currency/currency';
import ColorScheme from '../../common/colorscheme';

import styles from "./styles";

class SafeBalance extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={[styles.mainBalance, styles.safeBalance]}>

                <Text style={Ui.balanceHeader}>
                    {I18n.t('safeBalance')}
                </Text>

                <View style={{flexDirection:'row'}}>
                    <CurrencyIcon color={ColorScheme.mainCurrencyColor} size={26} currency={this.props._currency.toLowerCase()}/>
                    <Text style={Ui.mainBalanceValue}>
                        {this.props._safe_balance}
                    </Text>
                </View>


            </View>
        );
    }
}

export default SafeBalance;
