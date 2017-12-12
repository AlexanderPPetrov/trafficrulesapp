import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet,  View, ScrollView} from 'react-native';

import styles from "./styles";
import ListItem from "./listitem";
import {Container, Header, Content, Card, CardItem, Text, Icon, Right} from 'native-base';

class Balance extends Component {


    prepareData = (data) => {
        let sectionsData = [];
        for (var value of data) {
            let section = {
                title: value._currency,
                data: [value]
            };
            sectionsData.push(section)
        }
        return sectionsData;
    };


    getListItem = (balance, i) => {
        return <ListItem key={i} _cash_balance={balance._cash_balance} _money_in_accounts={balance._money_in_accounts} _currency={balance._currency}></ListItem>;
    };

    balanceList = () => {
        const listItems = this.props.balances.map((balance, i) =>
            // Correct! Key should be specified inside the array.
            this.getListItem(balance, i)

        );
        return (
            <View>
                {listItems}
            </View>
        );
    };

    render() {
        return (


            <ScrollView style={[styles.balancePadding, styles.balancesContainer]}>
                <Card>
                    <View header>
                        <Text>{I18n.t('balances')}</Text>
                    </View>
                    {this.balanceList()}
                </Card>


                {/*<SectionList*/}
                {/*sections= {this.prepareData(this.props.balances)}*/}

                {/*// renderSectionHeader={({section}) =>*/}
                {/*//     <Text style={styles.balanceHeader}></Text>*/}
                {/*//*/}
                {/*// }*/}
                {/*renderItem={({item}) =>*/}

                {/*}*/}

                {/*keyExtractor={(item, index) => index}*/}
                {/*/>*/}

            </ScrollView>

        );
    }
}

export default Balance;
