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
    Card, CardItem, List, ListItem, Separator,
    Left,
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import { ScrollView, RefreshControl, View } from "react-native";
import BalanceHeader from "../../common/balanceheader/balanceheader";

import styles from "./styles";
import BetDetails from "../../common/betdetails/betdetails";
import Api from "../../../Api";


class OpenBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _payload: {
                bets: [],
                _brokerage_balance:'',
                _brokerage_outstanding:'',
                _brokerage_currency:'',
            },
            refreshing: false,
            loaded:false
        }
    }

    componentDidMount = () => {
        this.loadData()
    };

    loadData = (loader = true) => {
        Api.get({
            url: 'get-brokerage-open-bets',
            success: this.dataLoaded,
            always: this.setRefreshing,
            loader
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false, loaded:false})
    };

    dataLoaded = (response) => {
        if(!response._brokerage_balance) {
            response._brokerage_balance = '-'
        }
        if(!response._brokerage_outstanding){
            response._brokerage_outstanding = '-'
        }
        this.setState({
            _payload: response,
            loaded:true
        })

        console.log(response)

    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData(false)
    };

    getListItem = (bet) => {
        return  <BetDetails key={bet._id} bet={bet}/>
    };

    getBetList = () => {
        let betList = this.state._payload.bets.map((bet) =>
            this.getListItem(bet)
        );
        if (this.state._payload.bets.length == 0 && this.state.loaded) {
            return <Text style={styles.noBets}>{I18n.t('noRunningBets')}</Text>;
        }
        return (
            <View>
                {betList}
            </View>
        );
    };


    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:110}}>
                    <BalanceHeader
                        balanceLeft={this.state._payload._brokerage_balance}
                        currencyLeft={this.state._payload._brokerage_currency}
                        titleLeft={I18n.t('brokerageBalance')}
                        balanceRight={this.state._payload._brokerage_outstanding}
                        currencyRight={this.state._payload._brokerage_currency}
                        titleRight={I18n.t('totalOutstanding')}
                    />
                </View>

                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>

                    {this.getBetList()}
                </ScrollView>
            </View>

        );
    }
}

export default OpenBets;
