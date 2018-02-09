import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Header,
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
import {View, ScrollView, RefreshControl} from "react-native";
import Ui from '../../common/ui';

import DatePicker from '../../common/datepicker/datepicker'

import styles from "./styles";
import Api from "../../../Api";


class SettledBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _payload: {
                bets: []
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
            url: 'get-brokerage-settled-bets',
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

    getProfitStyle = (profit) => {
        let style = styles.profitWin;
        if(parseFloat(profit) < 0){
            style = styles.profitLoss
        }
        if(parseFloat(profit) == 0){
            style = styles.profitTie
        }
        return style
    }

    getBetStyle = (profit) => {
        let style = styles.betWin;
        if(parseFloat(profit) < 0){
            style = styles.betLoss
        }
        if(parseFloat(profit) == 0){
            style = styles.betTie
        }
        return style
    }

    getListItem = (bet, i) => {
        // const date = new Date(bet._date),
        //     dayDate = date.getDate();
        //
        const date = Api.getDate(bet._date),
            dayDate = date.getDate(),
            monthAbbr = Api.getMonthAbbr(date.getMonth() + 1).substring(0, 3).toUpperCase();

        return <View key={i} style={[styles.settledBetContainer, this.getBetStyle(bet._profit)]}>
            <Grid>
                <Col size={1} style={{justifyContent:'center'}}>
                    <Text style={Ui.dayLabel}>{dayDate}</Text>
                    <Text style={Ui.monthLabel}>{monthAbbr}</Text>
                </Col>
                <Col size={4} >
                    <Row>
                        <Col size={3} style={{justifyContent:'center'}}>
                            <Text style={Ui.itemLabel}>{I18n.t('turnOver')}</Text>
                        </Col>
                        <Col size={3} style={{justifyContent:'center'}}>
                            <Text style={Ui.balanceValue}>{bet._turnover}</Text>
                        </Col>
                        <Col style={Ui.currencyWidth} >
                            <Text style={Ui.balanceCurrency}>{bet._currency}</Text>
                        </Col>

                    </Row>
                    <Row>

                        <Col size={3} style={{justifyContent:'center'}}>
                            <Text style={Ui.itemLabel}>{I18n.t('profit')}</Text>
                        </Col>
                        <Col size={3} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, this.getProfitStyle(bet._profit)]}>{bet._profit}</Text>
                        </Col>
                        <Col style={Ui.currencyWidth}>
                            <Text style={Ui.balanceCurrency}>{bet._currency}</Text>
                        </Col>

                    </Row>
                </Col>
            </Grid>
        </View>
    };

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );

        if (bets.length == 0 && this.state.loaded) {
            return <Text style={styles.noBets}>{I18n.t('noSettledBets')}</Text>;
        }
        return (
            <View>
                {betList}
            </View>

        );
    };

    render() {
        return (
            <View>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    {this.getFilter()}
                    {this.getBetList(this.state._payload.bets)}
                </ScrollView>
            </View>

        );
    }
}

export default SettledBets;
