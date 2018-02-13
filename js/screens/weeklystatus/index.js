import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Header from '../../common/header/header';

import {
    Container,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card, CardItem, List, ListItem,
    Left,
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {ScrollView} from "react-native";
import Ui from '../../common/ui';

import DatePicker from 'react-native-datepicker'

import styles from "./styles";
import Api from "../../../Api";


class WeeklyStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weekly_status: {
                "cash_balances": [{
                    "_currency": "BTC",
                    "_balance": "0.00"
                },
                    {
                        "_currency": "EUR",
                        "_balance": "190.00"
                    },
                    {
                        "_currency": "GBP",
                        "_balance": "20.00"
                    },
                    {
                        "_currency": "P",
                        "_balance": "104.00"
                    },
                    {
                        "_currency": "USD",
                        "_balance": "32.00"
                    }
                ],
                "accounts_balances": {
                    "EUR": {
                        "0": {
                            "_site": "1 Bet",
                            "_username": "1Bet",
                            "_currency": "EUR",
                            "_balance": "0.00"
                        },
                        "1": {
                            "_site": "1 Bet",
                            "_username": "hhh561",
                            "_currency": "EUR",
                            "_balance": "0.00"
                        },
                        "2": {
                            "_site": "1 Bet",
                            "_username": "hhh562",
                            "_currency": "EUR",
                            "_balance": "0.00"
                        },
                        "3": {
                            "_site": "IBC BET",
                            "_username": "klimentTest02",
                            "_currency": "EUR",
                            "_balance": "0.00"
                        },
                        "4": {
                            "_site": "PINNACLE Sports",
                            "_username": "Pinnacle",
                            "_currency": "EUR",
                            "_balance": "0.00"
                        },
                        "5": {
                            "_site": "Matchbook",
                            "_username": "test",
                            "_currency": "EUR",
                            "_balance": "0.00"
                        },
                        "_total_balance": 0
                    },
                    "GBP": {
                        "0": {
                            "_site": "Bop",
                            "_username": "Test Bop",
                            "_currency": "GBP",
                            "_balance": "0.00"
                        },
                        "_total_balance": 0
                    },
                    "P": {
                        "0": {
                            "_site": "Brokerage",
                            "_username": "Test brokerage",
                            "_currency": "P",
                            "_balance": "-82.00"
                        },
                        "_total_balance": -82
                    }
                },
                "totals": [{
                    "_currency": "P",
                    "_balance": 22
                },
                    {
                        "_currency": "EUR",
                        "_balance": 190
                    },
                    {
                        "_currency": "GBP",
                        "_balance": 20
                    },
                    {
                        "_currency": "USD",
                        "_balance": 32
                    }
                ]
            }
        }
    }

    componentDidMount = () => {

    }

    getCashBalance = (key, title) => {
        const switchList = this.state.weekly_status[key].map((balance, i) => {
            return <ListItem key={i} style={Ui.listItem}>
                <Col size={3}>
                    <Text style={{textAlign:'left', alignSelf:'stretch'}}>{balance._balance}</Text>
                </Col>
                <Col size={1}>
                    <Text style={{textAlign:'right', alignSelf:'stretch'}}>{balance._currency}</Text>
                </Col>
            </ListItem>
        });

        return <List>
            <Text>{I18n.t(title).toUpperCase()}</Text>
            <ListItem itemDivider>
                <Col size={3}>
                    <Text style={{textAlign:'left', alignSelf:'stretch'}}>{I18n.t('balance')}</Text>
                </Col>
                <Col size={1}>
                    <Text style={{textAlign:'right', alignSelf:'stretch'}}>{I18n.t('_currency')}</Text>
                </Col>
            </ListItem>
            {switchList}
        </List>
    };

    getAccountsBalance = () => {
        //TODO refactor after design is provided
        let accountsList = [];
        let index = 0;
        for (let [k, v] of Object.entries(this.state.weekly_status.accounts_balances)) {

            for(let [key, value] of Object.entries(v)){
                index++;

                if(key === '_total_balance') continue;
                let item = <ListItem key={index} style={Ui.listItem}>
                    <Col size={2}>
                        <Text style={{textAlign:'left', alignSelf:'stretch'}}>{value._site}</Text>
                    </Col>
                    <Col size={2}>
                        <Text style={{textAlign:'left', alignSelf:'stretch'}}>{value._username}</Text>
                    </Col>
                    <Col size={1}>
                        <Text style={{textAlign:'left', alignSelf:'stretch'}}>{value._currency}</Text>
                    </Col>
                    <Col size={1}>
                        <Text style={{textAlign:'right', alignSelf:'stretch'}}>{value._balance}</Text>
                    </Col>
                </ListItem>
                accountsList.push(item)
            }

            const total =  <ListItem key={k} itemDivider>
                <Col size={1}>
                    <Text style={{textAlign:'left', alignSelf:'stretch'}}>{I18n.t('total')}</Text>
                </Col>
                <Col size={1}>
                    <Text style={{textAlign:'right', alignSelf:'stretch'}}>{v._total_balance}</Text>
                </Col>
            </ListItem>

            accountsList.push(total)
        }



        return <List>
            <Text>{I18n.t('balanceInAccounts').toUpperCase()}</Text>
            <ListItem itemDivider>
                <Col size={2}>
                    <Text style={{textAlign:'left', alignSelf:'stretch'}}>{I18n.t('_site')}</Text>
                </Col>
                <Col size={2}>
                    <Text style={{textAlign:'left', alignSelf:'stretch'}}>{I18n.t('account')}</Text>
                </Col>
                <Col size={1}>
                    <Text style={{textAlign:'left', alignSelf:'stretch'}}>{I18n.t('_currency')}</Text>
                </Col>
                <Col size={1}>
                    <Text style={{textAlign:'right', alignSelf:'stretch'}}>{I18n.t('balance')}</Text>
                </Col>
            </ListItem>
            {accountsList}


        </List>
    }

    render() {
        return (
            <Container style={Ui.container}>
                <Header
                    title={I18n.t('weeklyStatus')}
                />
                <ScrollView>
                    <Text>Status report for 23.23.2017</Text>
                    {this.getCashBalance('cash_balances','cashBalance')}
                    {this.getAccountsBalance()}
                    {this.getCashBalance('totals','total')}
                </ScrollView>
            </Container>

        );
    }
}

export default WeeklyStatus;
