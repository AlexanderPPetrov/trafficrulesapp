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

import {
    Form,
    Separator, InputField, LinkField,
    SwitchField, PickerField, DatePickerField, TimePickerField
} from 'react-native-form-generator';

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
            formData: {
                dateFrom: null,
                dateTo: null
            }

        }
    }

    componentDidMount = () => {
        this.setDates();

    }

    loadData = () => {
        Api.get({
            url: 'get-brokerage-settled-bets',
            success: this.dataLoaded,
            always: this.setRefreshing
        })
    }

    setRefreshing = () => {
        this.setState({refreshing: false})
    }
    dataLoaded = (response) => {
        this.setState({
            _payload: response
        })

    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.loadData()
    }

    setDates = () => {

        var currentDate = new Date();

        var days = 7;
        var beforeSevenDays = new Date();
        var res = beforeSevenDays.setTime(beforeSevenDays.getTime() - (days * 24 * 60 * 60 * 1000));
        beforeSevenDays = new Date(res);

        this.setState({
            formData: {
                dateFrom: currentDate,
                dateTo: beforeSevenDays
            }
        }, function () {

            this.refs.dateFrom.setDate(this.state.formData.dateFrom);
            this.refs.dateTo.setDate(this.state.formData.dateTo);
            this.loadData()

        });

    }

    dateFromChange = (date) => {
        //TODO finish fetch logic on date change
        console.log('asdasd',date)
    }
    dateToChange = (date) => {
        console.log('asdasd',date)
    }

    getFilter = () => {
        return <Form style={{height: 40}} ref='dateForm'>
            <Grid>
                <Col>
                    <DatePickerField ref='dateFrom'
                                     minimumDate={new Date('1/1/2017')}
                                     maximumDate={new Date()}
                                     placeholder={I18n.t('from')}
                                     onChange={this.dateFromChange}
                                     onChangeRaw={this.props.onChange}
                    />
                </Col>
                <Col>
                    <DatePickerField ref='dateTo'
                                     minimumDate={new Date('1/1/2017')}
                                     maximumDate={new Date()}
                                     placeholder={I18n.t('to')}
                                     onChange={this.dateToChange}
                                     onChangeRaw={this.props.onChange}
                    />
                </Col>
            </Grid>

        </Form>


    }

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
    }

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );
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
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    {this.getBetList(this.state._payload.bets)}
                </ScrollView>
            </View>

        );
    }
}

export default SettledBets;
