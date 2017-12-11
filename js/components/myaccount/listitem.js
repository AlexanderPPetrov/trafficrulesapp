import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import {Text, View} from 'react-native';

class ListItem extends Component {
    render() {
        return  <View style={styles.balanceView}>
            <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>
                    {I18n.t('cashBalance')}
                </Text>
                <Text style={styles.balanceValue}>
                    {this.props._cash_balance}
                </Text>
            </View>
            <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>
                    {I18n.t('moneyInAccounts')}
                </Text>
                <Text style={styles.balanceValue}>
                    {this.props._money_in_accounts}
                </Text>
            </View>
        </View>
    }
}
export default ListItem;