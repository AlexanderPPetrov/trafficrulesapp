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

import DatePicker from 'react-native-datepicker'

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
        console.log(date)
        this.setState({
            dateFrom: new Date(date),
        }, function () {
            this.loadData()
        });

    };

    dateToChange = (date) => {
        if (!this.state.loaded) return;

        console.log(date)
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
                <Card style={styles.datePickerContainer}>
                    <Text style={styles.datePickerLabel}>{I18n.t('from')}</Text>
                    <DatePicker
                        style={{alignSelf: 'flex-end'}}
                        date={this.state.dateFrom}
                        customStyles={styles.datePickerStyles}
                        format="YYYY-MM-DD"
                        mode="date"
                        iconComponent={<Icon active name='ios-calendar-outline' style={styles.calendarIcon}/>}
                        // minDate={new Date('2017-1-1')}
                        maxDate={new Date()}
                        placeholder={I18n.t('from')}
                        onDateChange={(date) => {
                            this.dateFromChange(date)
                        }}
                        confirmBtnText={I18n.t('ok')}
                        cancelBtnText={I18n.t('cancel')}
                        btnTextConfirm={I18n.t('ok')}
                        btnTextCancel={I18n.t('cancel')}
                    />
                </Card>
            </Col>
            <Col>
                <Card style={styles.datePickerContainer}>
                    <Text style={styles.datePickerLabel}>{I18n.t('to')}</Text>
                    <DatePicker
                        style={{alignSelf: 'flex-end'}}
                        customStyles={styles.datePickerStyles}
                        date={this.state.dateTo}
                        mode="date"
                        iconComponent={<Icon active name='ios-calendar-outline' style={styles.calendarIcon}/>}
                        maxDate={new Date()}
                        placeholder={I18n.t('to')}
                        onDateChange={(date) => {
                            this.dateToChange(date)
                        }}
                        confirmBtnText={I18n.t('ok')}
                        cancelBtnText={I18n.t('cancel')}
                        btnTextConfirm={I18n.t('ok')}
                        btnTextCancel={I18n.t('cancel')}
                    />
                </Card>
            </Col>
            </Row>
        </Grid>
    };

    getStatus = (profit) => {
        if(parseFloat(profit) < 0){
            return <Text style={[styles.settledBetStatus, styles.betLoss]}>{I18n.t('loss').toUpperCase()}</Text>
        }
        if(parseFloat(profit) == 0){
            return <Text style={[styles.settledBetStatus, styles.betTie]}>{I18n.t('tie').toUpperCase()}</Text>
        }
        return <Text style={[styles.settledBetStatus, styles.betWin]}>{I18n.t('win').toUpperCase()}</Text>
    }

    getListItem = (bet, i) => {
        return <Card key={i} style={styles.settledBetContainer}>
            <Grid>
                <Row>
                    <Col size={1}>
                        <Text style={styles.settledBetLabel}>{bet._date.split(' ')[0]}</Text>
                    </Col>
                    <Col size={1}>
                        {this.getStatus(bet._profit)}
                    </Col>

                </Row>
                <Row>

                    <Col size={3}>
                        <Text style={Ui.balanceLabel}>{I18n.t('turnOver')}</Text>
                    </Col>
                    <Col size={3}>
                        <Text style={Ui.balanceValue}>{bet._turnover}</Text>
                    </Col>
                    <Col style={Ui.currencyWidth}>
                        <Text style={Ui.balanceCurrency}>{bet._currency}</Text>
                    </Col>

                </Row>
                <Row>

                    <Col size={3}>
                        <Text style={Ui.balanceLabel}>{I18n.t('profit')}</Text>
                    </Col>
                    <Col size={3}>
                        <Text style={Ui.balanceValue}>{bet._profit}</Text>
                    </Col>
                    <Col style={Ui.currencyWidth}>
                        <Text style={Ui.balanceCurrency}>{bet._currency}</Text>
                    </Col>

                </Row>

            </Grid>
        </Card>
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
