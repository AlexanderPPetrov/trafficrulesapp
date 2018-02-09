import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
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
import {View, FlatList, RefreshControl} from "react-native";
import Ui from '../../common/ui';
import Controller from '../../../Controller';
import Header from '../../common/header/header';

import DatePicker from '../../common/datepicker/datepicker'

import styles from "./styles";
import Api from "../../../Api";

const listOrder = ['_payment_method', '_account', '_fee', '_amount', '_date_created', '_status'];
const statuses = ['confirmed','pending','rejected','cancelled','failed','authorized','changed','inspected','revoked'];

const translationKeys = {
    _payment_method:'paymentMethod',
    _account: 'account',
    _fee:'fee',
    _amount:'amount',
    _date_created:'dateCreated',
    _status:'status'
}

const transactionTypes = {
    1: 'safeDeposit',
    2: 'cashDeposit',
    4: 'safeWithdraw',
    5: 'cashWithdraw',
    10: 'deposit',
    11: 'withdraw',
    13: 'receiveMoney',
    14: 'sendMoney',
}

//  default: return 'Cash Deposit';

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _payload: {
                transactions: []
            },
            refreshing: false,
            dateFrom: null,
            dateTo: null,
            loaded: false
        }
    }

    componentDidMount = () => {
        this.setDates();

    }

    loadData = (loader = true) => {
        Api.get({
            url: 'get-member-transactions',
            success: this.dataLoaded,
            data: {
                date_to: Api.formatDate(this.state.dateTo),
                date_from: Api.formatDate(this.state.dateFrom),
            },
            always: this.setRefreshing,
            loader:loader
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    dataLoaded = (response) => {
        this.setState({
            _payload: response,
            loaded: true
        })

    };

    onRefresh = () => {
        this.setState({refreshing: true, loaded: false});
        this.loadData(false)
    };

    setDates = () => {

        var currentDate = new Date();

        var days = 7;
        var beforeSevenDays = new Date();
        var res = beforeSevenDays.setTime(beforeSevenDays.getTime() - (days * 24 * 60 * 60 * 1000));
        beforeSevenDays = new Date(res);

        this.setState({
            dateFrom: beforeSevenDays,
            dateTo: currentDate

        }, function () {
            this.loadData()
        });

    };

    dateFromChange = (date) => {

        if (!this.state.loaded) return;
        this.setState({
            dateFrom: new Date(date),
        }, function () {
            this.loadData()
        });

    };

    dateToChange = (date) => {
        if (!this.state.loaded) return;

        this.setState({
            dateTo: new Date(date),
        }, function () {
            this.loadData()
        });
    };

    getFilter = () => {
        return <Grid>
            <Row>
                <Col>
                    <DatePicker
                        date={this.state.dateFrom}
                        title={I18n.t('from')}
                        onDateChange={this.dateFromChange}
                    />
                </Col>
                <Col>
                    <DatePicker
                        date={this.state.dateTo}
                        title={I18n.t('to')}
                        onDateChange={this.dateToChange}
                    />
                </Col>
            </Row>
        </Grid>
    };

    getListItem = (transaction, property, i) => {
        let value = transaction[property],
            valueStyle = Ui.balanceValueSmall;

        if(property == '_status') {
            value = I18n.t(statuses[transaction[property]])
        }

        if(property == '_fee' && !transaction[property]){
            value = '0'
        }
        if(property == '_date_created'){
            value = transaction[property].split(' ')[0]
        }

        return <ListItem key={i} style={Ui.listItem}>
            <Col size={2}>
                <Text style={Ui.itemLabel}>{I18n.t(translationKeys[property])}</Text>
            </Col>
            <Col size={3}>
                <Text style={[Ui.balanceValue, valueStyle]}>{value}</Text>
            </Col>
        </ListItem>
    }

    getWholeAmount = (fee, amount) =>{
        if(!fee){
            fee = 0
        }
        let wholeAmount = parseFloat(fee) + parseFloat(amount);
        return parseFloat(wholeAmount).toFixed(2)
    }

    getIcon = (type) =>{
        return <Icon name="ios-arrow-round-forward-outline" size={28} style={styles.headerIcon}/>

    }

    getCard = (transaction, i) => {

        if(!transactionTypes[transaction._payment_type]){
            transaction._payment_type = 2;
        }

        let cardListItems = listOrder.map((property, i) =>
            this.getListItem(transaction, property, i)
        );
        return <View key={i}>
            <List >
                <ListItem itemDivider style={[Ui.listHeader, Ui.listHeaderExtended]}>
                    <Grid>
                        <Col style={{width: 30, justifyContent: 'flex-start'}}>
                            <View style={styles.headerIconContainer}>
                                {this.getIcon(transaction._payment_type)}
                            </View>
                        </Col>
                        <Col style={{justifyContent: 'flex-start'}}>
                            <Text style={styles.headerLabel}>{(I18n.t(transactionTypes[transaction._payment_type]))}</Text>
                        </Col>
                        <Col style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                            <Text>{this.getWholeAmount(transaction._fee, transaction._amount)}</Text>
                        </Col>
                    </Grid>

                </ListItem>
                {cardListItems}
            </List>
        </View>;
    };

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <Container style={Ui.container}>
                <Header
                    title={I18n.t('transactions')}
                />
                <View style={{height:80}}>
                    {this.getFilter()}
                </View>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    keyExtractor={this._keyExtractor}
                    removeClippedSubviews={false}
                    data={this.state._payload.transactions}
                    renderItem={({item}) => this.getCard(item)}
                />
            </Container>

        );
    }
}

export default Transactions;
