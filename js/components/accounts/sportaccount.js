import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';

import styles from "./styles";
// let sectionsData = [
//     {title: 'EUR', data: [{cashBalance: '625.00', moneyInAccounts: '1234'}]},
// {title: 'USD', data: [{cashBalance: '123.34', moneyInAccounts: '543.00'}]},
// ]

const accounts = [{
    "_id": 51203,
    "_type": "sport",
    "_site": "1Bet",
    "_username": "hhh562",
    "_currency": "EUR",
    "_credit": 1500,
    "_balance": 1500.00,
    "_last_status": "2016-02-24"
}];



class SportAccount extends Component {

    prepareData = (data) => {

        let sectionsData = [];
        for (var value of data) {
            let section = {
                title: value._type + ' '+  I18n.t('account'),
                data:[value]
            };
            sectionsData.push(section)
        }

        console.log(sectionsData);
        return sectionsData;
    };

    render() {
        return (
            <ScrollView>
                <SectionList
                   sections= {this.prepareData(accounts)}

                    renderSectionHeader={({section}) =>
                        <Text style={styles.balanceHeader}>{section.title}</Text>
                    }
                    renderItem={({item}) =>
                        <View style={styles.balanceView}>
                            <View style={styles.balanceItem}>
                                <Text style={styles.balanceLabel}>
                                    {I18n.t('site')}
                                </Text>
                                <Text style={styles.balanceValue}>
                                    {item._site}
                                </Text>
                            </View>
                            <View style={styles.balanceItem}>
                                <Text style={styles.balanceLabel}>
                                    {I18n.t('username')}
                                </Text>
                                <Text style={styles.balanceValue}>
                                    {item._username}
                                </Text>
                            </View>
                            <View style={styles.balanceItem}>
                                <Text style={styles.balanceLabel}>
                                    {I18n.t('currency')}
                                </Text>
                                <Text style={styles.balanceValue}>
                                    {item._currency}
                                </Text>
                            </View>
                            <View style={styles.balanceItem}>
                                <Text style={styles.balanceLabel}>
                                    {I18n.t('credit')}
                                </Text>
                                <Text style={styles.balanceValue}>
                                    {item._credit}
                                </Text>
                            </View>
                            <View style={styles.balanceItem}>
                                <Text style={styles.balanceLabel}>
                                    {I18n.t('balance')}
                                </Text>
                                <Text style={styles.balanceValue}>
                                    {item._balance}
                                </Text>
                            </View>
                            <View style={styles.balanceItem}>
                                <Text style={styles.balanceLabel}>
                                    {I18n.t('lastStatus')}
                                </Text>
                                <Text style={styles.balanceValue}>
                                    {item._last_status}
                                </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />

            </ScrollView>

        );
    }
}

export default SportAccount;
