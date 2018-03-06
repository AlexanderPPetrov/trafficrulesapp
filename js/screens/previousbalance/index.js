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
    Left,
    Card,
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {ScrollView, RefreshControl} from 'react-native';
import PreviousBalanceChart from './previousbalancechart'
import Controller from '../../../Controller';
import Header from '../../common/header/header';

import Ui from '../../common/ui';

import Balance from "./balance";
import Api from "../../../Api";

class PreviousBalance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                balances: []
            },
            refreshing: false,
            balance: [],
            maxBalance: '',
            minBalance: '',
            maxChange: '',
            minChange: '',
            minValue: '',
            maxValue:'',
            change: [],
            loaded: false

        }
    }

    componentDidMount = () => {

        this.loadData()

    };

    loadData = (loader = true) => {
        Api.get({
            url: 'get-account-balances',
            data: {
                account_id: this.props.navigation.state.params._id
            },
            success: this.dataLoaded,
            always: this.setRefreshing,
            loader
        })
    };

    dataLoaded = (response) => {
        this.setState({
            _payload: response,
            loaded: true
        })
        this.prepareChartData(response)
    };

    prepareChartData = (response) => {
        let balance = [],
            change = [];

        for (let i = 0; i < response.balances.length; i++) {

            let value = response.balances[i]
            balance.push({x: value._date_created, y: parseInt(value._balance)})
            change.push({x: value._date_created, y: parseInt(value._change)})
        }

        balance.reverse();
        change.reverse();

        const maxBalance = this.defineMax(balance);
        const maxChange = this.defineMax(change);

        const minBalance = this.defineMin(balance);
        const minChange = this.defineMin(change);

        const maxValue = Math.max(maxBalance, maxChange)
        const minValue = Math.max(minBalance, minChange)

        this.setState({
            balance,
            maxBalance,
            minBalance,
            maxChange,
            minChange,
            maxValue,
            minValue,
            change
        })
    }

    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData(false)
    };

    defineMax = (data) => {
        let maxValue = Math.max(...data.map((d) => d.y))
        if(maxValue < 1){
            maxValue = 1
        }
        return maxValue;
    };

    defineMin = (data) => {
        let minValue = Math.min(...data.map((d) => d.y))
        return minValue;
    };

    getChart = () => {
        if (this.state.balance.length >= 2) {
            return <PreviousBalanceChart onRef={ref => (this.chart = ref)} balance={this.state.balance}
                                      maxBalance={this.state.maxBalance}
                                      minBalance={this.state.minBalance}
                                      maxChange={this.state.maxChange}
                                      minChange={this.state.minChange}
                                      maxValue={this.state.maxValue}
                                      minValue={this.state.minValue}
                                      change={this.state.change} currency={this.props.navigation.state.params._currency}
                                      currentBalance={this.props.navigation.state.params._balance}/>

        }
        return null
    }

    getBalances = () => {
        if (this.state.loaded && this.state._payload.balances.length > 0) {
            return <Balance navigation={this.props.navigation} balances={this.state._payload.balances}
                         currency={this.props.navigation.state.params._currency}/>
        }
        return null

    }

    goBack = () => {
        Controller.navigateTo('Accounts')
    }

    render() {
        return (
            <Container style={Ui.container}>

                <Header
                    onBack={this.goBack}
                    title={I18n.t('_balance') + ' ' + I18n.t('for') + ' ' + this.props.navigation.state.params._username}
                    cancel={false}
                />

                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>

                    {/*{this.getChart()}*/}
                    {this.getBalances()}


                </ScrollView>
            </Container>
        );
    }
}

export default PreviousBalance;
