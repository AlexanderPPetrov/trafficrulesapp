import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import {View} from 'react-native';
import {Container, Header, Content, Card, CardItem, Text, Right, ListItem} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {MaterialCommunityIcons} from '@expo/vector-icons';

let currencies = ['usd', 'btc', 'eur', 'inr', 'gbp'];

class BalanceItem extends Component {

    getCurrencyIcon = () => {
        if (currencies.indexOf(this.props._currency.toLowerCase()) != -1) {
            let iconName = 'currency-' + this.props._currency.toLowerCase()
            return <MaterialCommunityIcons name={iconName} size={30} color="#364b5a"/>
        } else {
            return <Text style={{color: '#364b5a', fontSize: 26}}>{this.props._currency}</Text>
        }
    }

    render() {
        return <ListItem style={{marginLeft: 0, paddingLeft: 15}}>

            <Col style={{width: 66}}>
                <View style={styles.iconContainer}>
                    {this.getCurrencyIcon()}
                </View>
            </Col>
            <Col size={3}>
                <Row><Text style={{fontSize: 16}}>{I18n.t('cashBalance')}</Text></Row>
                <Row><Text style={styles.moneyInAccounts}>{I18n.t('moneyInAccounts')}</Text></Row>
            </Col>
            <Col size={2}>
                <Row>
                    <Col size={4}>
                        <Text style={styles.balanceValue}>{this.props._cash_balance}</Text>
                    </Col>
                    <Col style={{width:40}}>
                        <Text style={styles.balanceCurrency}>{this.props._currency}</Text>
                    </Col>

                </Row>
                <Row>
                    <Col size={4}>
                        <Text style={styles.balanceValue}>{this.props._money_in_accounts}</Text>
                    </Col>
                    <Col style={{width:40}}>
                        <Text style={styles.balanceCurrency}>{this.props._currency}</Text>
                    </Col>
                </Row>
            </Col>


        </ListItem>

    }
}

export default BalanceItem;