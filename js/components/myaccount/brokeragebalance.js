import React, { Component } from "react";
import I18n from '../../../i18n/i18n';
import { View } from "react-native";
import {
    Text
} from "native-base";

import styles from "./styles";
class BrokerageBalance extends Component {
    render() {
        return (
            <View style={[styles.balancePadding, styles.brokerageBalanceContainer]}>

                <Text style={styles.brokerageText}>
                    {I18n.t('brokerageBalance')}
                </Text>
                <Text style={styles.brokerageText}>
                    12378.70 EUR
                </Text>

            </View>
        );
    }
}

export default BrokerageBalance;
