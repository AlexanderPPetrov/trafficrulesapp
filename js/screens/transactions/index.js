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
import {View, FlatList} from "react-native";
import Ui from '../../common/ui';
import Header from '../../common/header/header';
import { MaterialCommunityIcons} from '@expo/vector-icons';

import DatePicker from '../../common/datepicker/datepicker'

import Api from "../../../Api";
import ColorScheme from "../../common/colorscheme";

const statuses = ['confirmed','pending','rejected','cancelled','failed','authorized','changed','inspected','revoked'];

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
            loaded: false,
            paymentMethods:{}
        }
    }

    componentDidMount = () => {
        this.getPaymentNames()

        Header.setNavigation(this.props.navigation)
        this.navigationSubscribe = this.props.navigation.addListener(
            'willFocus',
            () => {
                Header.setRoute('Transactions')
            }
        );
    }

    componentWillUnmount = () => {
        this.navigationSubscribe.remove();
    }

    getPaymentNames = () => {
        Api.get({
            url: 'get-all-payment-methods-names',
            success: this.setPaymentMethodNames,
            always: this.setDates
        })
    }

    setPaymentMethodNames = (response) => {
        this.setState({
            paymentMethods: response.paymentMethods
        })
    }

    getPaymentMethod = (key) => {
        if(this.state.paymentMethods[key]){
            return this.state.paymentMethods[key]
        }
        return key
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
                    <DatePicker key={0}
                        date={this.state.dateFrom}
                        title={I18n.t('from')}
                        onDateChange={this.dateFromChange}
                    />
                </Col>
                <Col style={Ui.datePickerBorder}>
                    <DatePicker key={1}
                        date={this.state.dateTo}
                        title={I18n.t('to')}
                        onDateChange={this.dateToChange}
                    />
                </Col>
            </Row>
        </Grid>
    };


    getIcon = (type) =>{

        if(type === '1' || type === '2' || type === '10' || type === '13'){
            return <MaterialCommunityIcons name={'arrow-top-right'} size={28} style={{color: ColorScheme.win}}/>
        }
        return <MaterialCommunityIcons name={'arrow-bottom-left'} size={28} style={{color:ColorScheme.loss}}/>

    }

    getStatusLabel = (statusCode) => {
        let status = statuses[statusCode]

        if(!status) status = 'running';
        let labelStyles = [Ui.statusContainer, Ui[status]];
        return <View style={labelStyles}>
                <Text style={Ui.statusLabel}>{I18n.t(status).toUpperCase()}</Text>
            </View>

    }

    getTransactionItem = (transaction, i) => {

        if(!transactionTypes[transaction._payment_type]){
            transaction._payment_type = 2;
        }
        if(!transaction._account){
            transaction._account = I18n.t('noAccountSelected')
        }
        if(!transaction._fee){
            transaction._fee = 0;
        }

        let amount = parseFloat(transaction._fee) + parseFloat(transaction._amount);
        amount = parseFloat(amount).toFixed(2)

        return <View key={i} style={Ui.transactionsContainer}>
                    <Grid>
                        <Col size={1} style={{alignItems:'center', minWidth:15}}>
                            <View style={Ui.iconContainer}>
                                {this.getIcon(transaction._payment_type)}
                            </View>
                        </Col>
                        <Col size={4} >
                            <Row>
                                <Col size={2} style={{justifyContent:'center'}}>
                                    <Text style={[Ui.itemLabel, Ui.labelSmallest, Ui.itemLabelLight]}>{I18n.t(transactionTypes[transaction._payment_type]).toUpperCase()}</Text>
                                </Col>
                                <Col size={1} style={{justifyContent:'center'}}>
                                    <Text style={[Ui.balanceValue, Ui.labelSmallest, Ui.itemLabelLight]}>{transaction._date_created.split(' ')[0]}</Text>
                                </Col>
                            </Row>
                            <Row style={{marginTop:5}}>
                                <Col size={1} style={{justifyContent:'center'}}>
                                    <Text style={[Ui.itemLabel, Ui.itemLabelDark, Ui.bold]}>{this.getPaymentMethod(transaction._payment_method)}</Text>
                                </Col>
                                <Col size={1} style={{justifyContent:'center'}}>
                                    <Text style={[Ui.balanceValue, Ui.balanceValueSmall, Ui.itemLabelDark, Ui.bold]}>{amount} {transaction._currency}</Text>
                                </Col>
                            </Row>
                            {/*<Row>*/}
                                {/*<Col size={2} style={{justifyContent:'center'}}>*/}
                                    {/*<Text style={[Ui.itemLabel, styles.paymentTypeLabel]}>{I18n.t('fee').toUpperCase()}</Text>*/}
                                {/*</Col>*/}
                                {/*<Col size={1} style={{justifyContent:'center'}}>*/}
                                    {/*<Text style={[Ui.balanceValue, Ui.balanceValueSmall]}>{transaction._fee} {transaction._currency}</Text>*/}
                                {/*</Col>*/}
                            {/*</Row>*/}
                            <Row style={{marginTop:5, marginBottom:0}}>
                                <Col size={2} style={{justifyContent:'center'}}>
                                    <Text style={Ui.itemLabel}>{transaction._account}</Text>
                                </Col>
                                <Col size={1} style={{justifyContent:'center'}}>
                                    {this.getStatusLabel(transaction._status)}
                                </Col>
                            </Row>
                        </Col>
                    </Grid>
                </View>
    };

    getResults = () => {
        if(this.state._payload.transactions.length == 0 ){
            return <Text style={Ui.noResults}>{I18n.t('noTransactions')}</Text>
        }
        return <FlatList
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            keyExtractor={this._keyExtractor}
            removeClippedSubviews={false}
            data={this.state._payload.transactions}
            renderItem={({item}) => this.getTransactionItem(item)}
        />
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <Container style={Ui.container}>
                {/*<Header*/}
                    {/*title={I18n.t('transactions')}*/}
                    {/*indicatorRoute={'Transactions'}*/}
                {/*/>*/}
                <View style={{height:51}}>
                    {this.getFilter()}
                </View>
                {this.getResults()}
            </Container>

        );
    }
}

export default Transactions;
