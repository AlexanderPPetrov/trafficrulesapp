import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import {View} from 'react-native';
import {Container, Header, Content, Card, CardItem, Text, Right, ListItem} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Ui from '../../common/ui';

let currencies = ['usd', 'btc', 'eur', 'inr', 'gbp'];

class BalanceItem extends Component {

    getCurrencyIcon = () => {
        if (currencies.indexOf(this.props._currency.toLowerCase()) != -1) {
            let iconName = 'currency-' + this.props._currency.toLowerCase()
            return <MaterialCommunityIcons name={iconName} size={26} color='#fff'/>
        } else {
            return <Text style={{color: '#fff', fontSize: 22}}>{this.props._currency}</Text>
        }
    }

    render() {
        return <ListItem style={Ui.listItem}>

            <Col style={{width:60}}>
                <View style={[styles.iconContainer, styles[this.props._currency]]}>
                    {this.getCurrencyIcon()}
                </View>
            </Col>
            <Col >
                <Row><Text style={Ui.itemLabel}>{I18n.t('cashBalance')}</Text></Row>
                <Row><Text style={Ui.itemLabel}>{I18n.t('moneyInAccounts')}</Text></Row>
            </Col>
            <Col style={{minWidth:60}}>
                <Row>
                    <Col >
                        <Text style={Ui.balanceValue}>{this.props._cash_balance}</Text>
                    </Col>
                    <Col style={Ui.currencyWidth}>
                        <Text style={Ui.balanceCurrency}>{this.props._currency}</Text>
                    </Col>

                </Row>
                <Row>
                    <Col >
                        <Text style={Ui.balanceValue}>{this.props._money_in_accounts}</Text>
                    </Col>
                    <Col style={Ui.currencyWidth}>
                        <Text style={Ui.balanceCurrency}>{this.props._currency}</Text>
                    </Col>
                </Row>
            </Col>


        </ListItem>

    }
}

export default BalanceItem;