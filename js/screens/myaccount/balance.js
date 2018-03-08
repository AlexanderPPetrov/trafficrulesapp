import React, {Component} from "react";
import {View} from 'react-native';

import styles from "./styles";
import BalanceItem from "./balanceitem";
import ColorScheme from "../../common/colorscheme";
import {Container, Header, Content, Card, CardItem, Text, Icon, Right, List, ListItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

let colorIndex = -1;

class Balance extends Component {


    componentWillMount = () => {
        colorIndex = -1;
    }
    componentWillReceiveProps = () => {
        colorIndex = -1;
    }
    getListItem = (balance, i) => {
        colorIndex++;
        if(colorIndex > ColorScheme.currencyColors.length -1){
            colorIndex = 0;
        }
        return <BalanceItem key={i} colorIndex={colorIndex} _cash_balance={balance._cash_balance} _money_in_accounts={balance._money_in_accounts}
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
