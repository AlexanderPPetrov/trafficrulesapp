import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View} from 'react-native';

import styles from "./styles";


//TODO replace with real service data
const balances = [
    {_currency: 'EUR', _cash_balance: '625.00', _money_in_accounts: '1234'},
    {_currency: 'USD', _cash_balance: '625.00', _money_in_accounts: '1234'},
];

class Balance extends Component {

    prepareData = (data) => {
        let sectionsData = [];
        for (var value of data) {
            let section = {
                title: value._currency,
                data:[value]
            };
            sectionsData.push(section)
        }
        return sectionsData;
    };

    render() {
        return (
            <View style={[styles.balancePadding, styles.balancesContainer]}>
                <Text>
                    {I18n.t('balances')}
                </Text>

                    <SectionList
                        sections= {this.prepareData(balances)}

                        renderSectionHeader={({section}) =>
                            <Text style={styles.balanceHeader}>{section.title}</Text>

                        }
                        renderItem={({item}) =>
                            <View style={styles.balanceView}>
                                <View style={styles.balanceItem}>
                                    <Text style={styles.balanceLabel}>
                                        {I18n.t('cashBalance')}
                                    </Text>
                                    <Text style={styles.balanceValue}>
                                        {item._cash_balance}
                                    </Text>
                                </View>
                                <View style={styles.balanceItem}>
                                    <Text style={styles.balanceLabel}>
                                        {I18n.t('moneyInAccounts')}
                                    </Text>
                                    <Text style={styles.balanceValue}>
                                        {item._money_in_accounts}
                                    </Text>
                                </View>
                            </View>
                        }

                        keyExtractor={(item, index) => index}
                    />

            </View>

        );
    }
}

export default Balance;
