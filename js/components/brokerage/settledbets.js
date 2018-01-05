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

// import {
//     Form,
//     InputField, LinkField,
//     SwitchField, PickerField, DatePickerField, TimePickerField
// } from 'react-native-form-generator';
import DatePicker from 'react-native-datepicker'

import {MaterialCommunityIcons} from '@expo/vector-icons';

import styles from "./styles";
import Tabs from "./tabs";
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
            initialized: false
        }
    }

    componentDidMount = () => {
        this.setDates();

    }

    loadData = () => {
        //TODO finish date format ask why dateFrom and dateTo have different formats
        this.setState({initialized: true})
        Api.get({
            url: 'get-brokerage-settled-bets',
            success: this.dataLoaded,
            data: {
                date_to: Api.formatDate(this.state.dateTo),
                date_from: Api.formatDate(this.state.dateFrom),
            },
            always: this.setRefreshing
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    dataLoaded = (response) => {
        this.setState({
            _payload: response
        })

    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData()
    };

    setDates = () => {

        var currentDate = new Date();

        var days = 7;
        var beforeSevenDays = new Date();
        var res = beforeSevenDays.setTime(beforeSevenDays.getTime() - (days * 24 * 60 * 60 * 1000));
        beforeSevenDays = new Date(res);

        this.setState({
            dateFrom: currentDate,
            dateTo: beforeSevenDays

        }, function () {

            // this.refs.dateFrom.setDate(this.state.dateFrom);
            // this.refs.dateTo.setDate(this.state.dateTo);
            this.loadData()
        });

    };

    dateFromChange = (date) => {

        if (!this.state.initialized) return;
        console.log(date)
        // this.setState({
        //     dateFrom: date,
        // }, function () {
        //     this.loadData()
        // });

    };

    dateToChange = (date) => {
        if (!this.state.initialized) return;

        console.log(date)
        // this.setState({
        //     dateTo: date,
        // }, function () {
        //     this.loadData()
        // });
    };

    getFilter = () => {
        return <Grid>
            <Col>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.dateFrom}
                    format="YYYY-MM-DD"
                    mode="date"
                    minimumDate={new Date('2017-1-1')}
                    maximumDate={new Date()}
                    placeholder={I18n.t('from')}
                    onDateChange={(date) => {
                        this.dateFromChange(date)
                    }}
                />


            </Col>
            <Col>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.dateTo}
                    mode="date"
                    minimumDate={new Date('2017-1-1')}
                    maximumDate={new Date()}
                    placeholder={I18n.t('to')}
                    onDateChange={(date) => {
                        this.dateToChange(date)
                    }}
                />
                {/*<DatePicker*/}
                    {/*style={{width: 200}}*/}
                    {/*date={this.state.date}*/}
                    {/*mode="date"*/}
                    {/*placeholder="select date"*/}
                    {/*format="YYYY-MM-DD"*/}
                    {/*minDate="2016-05-01"*/}
                    {/*maxDate="2016-06-01"*/}
                    {/*confirmBtnText="Confirm"*/}
                    {/*cancelBtnText="Cancel"*/}
                    {/*customStyles={{*/}
                        {/*dateIcon: {*/}
                            {/*position: 'absolute',*/}
                            {/*left: 0,*/}
                            {/*top: 4,*/}
                            {/*marginLeft: 0*/}
                        {/*},*/}
                        {/*dateInput: {*/}
                            {/*marginLeft: 36*/}
                        {/*}*/}
                        {/*// ... You can check the source to find the other keys.*/}
                    {/*}}*/}
                    {/*onDateChange={(date) => {this.setState({date: date})}}*/}
                {/*/>*/}
            </Col>
        </Grid>

    };

    getListItem = (bet, i) => {
        return <ListItem key={i}>
            <Grid style={{height: 100}}>
                <Row>
                    <Text>{bet._date}</Text>
                </Row>
                <Row>
                    <Col size={3}>
                        <Text style={styles.betLabel}>{I18n.t('turnOver')}</Text>
                    </Col>
                    <Col size={2}>
                        <Text style={styles.betValue}>{bet._turnover} {bet._currency}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col size={3}>
                        <Text style={styles.betLabel}>{I18n.t('profit')}</Text>
                    </Col>
                    <Col size={2}>
                        <Text style={styles.betValue}>{bet._profit} {bet._currency}</Text>
                    </Col>
                </Row>

            </Grid>
        </ListItem>
    };

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );

        if (bets.length == 0) {
            return <Text
                style={{textAlign: 'center', padding: 10, alignSelf: "stretch"}}>{I18n.t('noSettledBets')}</Text>;
        }
        return (
            <View>
                <List>
                    {betList}
                </List>
            </View>

        );
    };

    render() {
        return (
            <View>
                {this.getFilter()}
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    {this.getBetList(this.state._payload.bets)}
                </ScrollView>
            </View>

        );
    }
}

export default SettledBets;
