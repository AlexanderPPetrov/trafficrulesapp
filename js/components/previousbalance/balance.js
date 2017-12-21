import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, List, ListItem, Card, Content} from "native-base";
import Ui from '../../common/ui';


class Balance extends Component {


    getBalanceItem = (balance, i) => {
        return <View key={i}>
            <View style={Ui.listHeaderExtended}>
                <Text style={styles.secondaryLabel}>{I18n.t('date')} {balance._date_created}</Text>
            </View>
            <List>
                <ListItem style={Ui.listItem}>
                    <Grid>
                        <Col size={3}>
                            <Text>{I18n.t('_balance')}</Text>
                        </Col>
                        <Col size={3}>
                            <Text style={Ui.balanceValue}>{balance._balance}</Text>
                        </Col>
                        <Col style={{width: 40}}>
                            <Text style={Ui.balanceCurrency}>{this.props.currency}</Text>
                        </Col>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid>
                        <Col size={3}>
                            <Text>{I18n.t('change')}</Text>
                        </Col>
                        <Col size={3}>
                            <Text style={Ui.balanceValue}>{balance._change}</Text>
                        </Col>
                        <Col style={{width: 40}}>
                            <Text style={Ui.balanceCurrency}>{this.props.currency}</Text>
                        </Col>
                    </Grid>
                </ListItem>
            </List>
        </View>

    }
    getBalanceList = (balances) => {
        let opacity = 0;
        if (balances.length > 0) {
            opacity = 1
        }
        const listItems = balances.map((balance, i) =>
            this.getBalanceItem(balance, i)
        );
        return (
            <Card style={{opacity: opacity}}>{listItems}</Card>
        );
    };


    render() {
        return (
            <Content>
                {this.getBalanceList(this.props.balances)}
            </Content>

        );
    }
}

export default Balance;
