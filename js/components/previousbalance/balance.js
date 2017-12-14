import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import { Grid, Row, Col } from "react-native-easy-grid";
import {Button, List, ListItem, Card, Content} from "native-base";



class Balance extends Component {


    getBalanceItem = (balance, i) => {
        return  <List key={i}>
            <ListItem itemDivider>
                <Text style={styles.secondaryLabel}>{I18n.t('date')} {balance._date_created}</Text>
            </ListItem>
            <ListItem >
                <Grid>
                    <Col size={3}>
                        <Text>{I18n.t('_balance')}</Text>
                    </Col>
                    <Col size={3}>
                        <Text style={styles.balanceValue}>{balance._balance}</Text>
                    </Col>
                    <Col style={{width:40}}>
                        <Text style={styles.balanceCurrency}>{this.props.currency}</Text>
                    </Col>
                </Grid>
            </ListItem>
            <ListItem >
                <Grid>
                    <Col size={3}>
                        <Text >{I18n.t('change')}</Text>
                    </Col>
                    <Col size={3}>
                        <Text style={styles.balanceValue}>{balance._change}</Text>
                    </Col>
                    <Col style={{width:40}}>
                        <Text style={styles.balanceCurrency}>{this.props.currency}</Text>
                    </Col>
                </Grid>
            </ListItem>
        </List>
    }
    getBalanceList = (balances) => {
        const listItems = balances.map((balance, i) =>
            this.getBalanceItem(balance, i)
        );
        return (
            <Card style={{minHeight:130}}>{listItems}</Card>
        );
    };


    render() {
        return (
            <ScrollView >
                <Content>
                    {this.getBalanceList(this.props.balances)}
                </Content>
            </ScrollView>

        );
    }
}

export default Balance;
