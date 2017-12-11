import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View} from 'react-native';

import styles from "./styles";
import ListItem from "./listitem";


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
                        sections= {this.prepareData(this.props.balances)}

                        renderSectionHeader={({section}) =>
                            <Text style={styles.balanceHeader}>{section.title}</Text>

                        }
                        renderItem={({item}) =>
                            <ListItem _cash_balance={item._cash_balance} _money_in_accounts={item._money_in_accounts}></ListItem>
                        }

                        keyExtractor={(item, index) => index}
                    />

            </View>

        );
    }
}

export default Balance;
