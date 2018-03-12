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
import {View, ScrollView, RefreshControl, TouchableWithoutFeedback, Modal} from "react-native";
import Ui from '../../common/ui';

import DatePicker from '../../common/datepicker/datepicker'
import BetDetailsModal from "../../common/betdetails/betdetailsmodal";
import Api from "../../../Api";


class SettledBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _payload: {
                bets: []
            },
            refreshing: false,
            date:'',
            dateFrom: null,
            dateTo: null,
            loaded: false,
            modalVisible: false
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
            loader
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
            <Col style={Ui.datePickerBorder}>
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
        let style = Ui.textWin;
        if(parseFloat(profit) < 0){
            style = Ui.textLoss
        }
        if(parseFloat(profit) == 0){
            style = Ui.textDraw
        }
        return style
    }

    getBetStyle = (profit) => {
        let style = Ui.betWin;
        if(parseFloat(profit) < 0){
            style = Ui.betLoss
        }
        if(parseFloat(profit) == 0){
            style = Ui.betDraw
        }
        return style
    }

    getListItem = (bet, i) => {
        // const date = new Date(bet._date),
        //     dayDate = date.getDate();
        //

        const date = Api.getDate(bet._date),
            dayDate = date.getDate(),
            month = date.getMonth(),
            monthAbbr = Api.getMonthAbbr(month);

        return <TouchableWithoutFeedback key={i} onPress={()=> this.openModal(bet._date)}>
            <View style={[Ui.profitHistoryContainer, this.getBetStyle(bet._profit)]}>
                <Grid>
                    <Col size={1} style={{justifyContent:'center'}}>
                        <Text style={Ui.dayLabel}>{dayDate}</Text>
                        <Text style={Ui.monthLabel}>{monthAbbr}</Text>
                    </Col>
                    <Col size={4} >
                        <Row>
                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('turnOver')}</Text>
                            </Col>
                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.balanceValue, Ui.profitValue,  Ui.itemLabelDark]}>{bet._turnover} {bet._currency}</Text>
                            </Col>
                            {/*<Col style={Ui.currencyWidth} >*/}
                                {/*<Text style={[Ui.balanceCurrency,  Ui.itemLabelDark]}>{bet._currency}</Text>*/}
                            {/*</Col>*/}

                        </Row>
                        <Row>

                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('profit')}</Text>
                            </Col>
                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.balanceValue, Ui.profitValue, this.getProfitStyle(bet._profit)]}>{bet._profit} {bet._currency}</Text>
                            </Col>
                            {/*<Col style={Ui.currencyWidth}>*/}
                                {/*<Text style={[Ui.balanceCurrency, this.getProfitStyle(bet._profit)]}>{bet._currency}</Text>*/}
                            {/*</Col>*/}

                        </Row>
                    </Col>
                </Grid>
            </View>
        </TouchableWithoutFeedback>
    };

    getProfit = (bets) => {
        let profit = 0;
        for(let i = 0; i < bets.length; i++){
            profit += parseFloat(bets[i]._profit)
        }

        return  <Col size={1}>
            <Row>
                <Col>
                    <Text style={[Ui.balanceValue, Ui.profitValue, Ui.bold, this.getProfitStyle(profit)]}>{profit} {Api.accountSettings._brokerage_currency}</Text>
                </Col>
                {/*<Col style={Ui.currencyWidth}>*/}
                    {/*<Text style={[Ui.balanceCurrency,Ui.bold, this.getProfitStyle(profit)]}>{Api.accountSettings._brokerage_currency}</Text>*/}
                {/*</Col>*/}
            </Row>
        </Col>
    }

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );

        if(this.state.refreshing) return null;

        if (bets.length == 0 && this.state.loaded) {
            return <Text style={Ui.noResults}>{I18n.t('noSettledBets')}</Text>;
        }
        return (
            <View>
                <View style={Ui.listItem}>
                    <Grid>
                        <Col size={2}>
                            <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('totalProfit')}</Text>
                        </Col>
                        {this.getProfit(bets)}

                    </Grid>
                </View>
                {betList}
            </View>

        );
    };

    openModal = (date) =>{
        BetDetailsModal.show(date)
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:51}}>
                    {this.getFilter()}
                </View>
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
