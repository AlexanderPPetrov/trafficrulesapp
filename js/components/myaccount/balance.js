import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, View, ScrollView} from 'react-native';

import styles from "./styles";
import BalanceItem from "./balanceitem";
import {Container, Header, Content, Card, CardItem, Text, Icon, Right, List} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Balance extends Component {


    getListItem = (balance, i) => {
        return <BalanceItem key={i} _cash_balance={balance._cash_balance} _money_in_accounts={balance._money_in_accounts}
                         _currency={balance._currency}></BalanceItem>;
    };

    balanceList = () => {
        const listItems = this.props.balances.map((balance, i) =>
            this.getListItem(balance, i)
        );
        return (
                <List>{listItems}</List>
        );
    };

    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>{I18n.t('balances')}</Text>
                </CardItem>

                {this.balanceList()}
            </Card>

        );
    }
}

export default Balance;
