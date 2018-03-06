import React, {Component} from "react";
import {View} from 'react-native';

import styles from "./styles";
import BalanceItem from "./balanceitem";
import {Container, Header, Content, Card, CardItem, Text, Icon, Right, List, ListItem} from 'native-base';
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
            <View>
                <List style={styles.mainBalanceContainer}>
                    {listItems}
                </List>
            </View>
        );
    };

    render() {
        return (
            this.balanceList()
        );
    }
}

export default Balance;
