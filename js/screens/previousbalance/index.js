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
    Left,
    Card,
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {View, ScrollView, RefreshControl} from 'react-native';
import PreviousBalanceChart from './previousbalancechart'

import Ui from '../../common/ui';

import Balance from "./balance";
import styles from "./styles";
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
            loader: loader
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

        this.setState({
            balance,
            maxBalance,
            minBalance,
            maxChange,
            minChange,
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
            return <Card>
                <PreviousBalanceChart onRef={ref => (this.chart = ref)} balance={this.state.balance}
                                      maxBalance={this.state.maxBalance}
                                      minBalance={this.state.minBalance}
                                      maxChange={this.state.maxChange}
                                      minChange={this.state.minChange}
                                      change={this.state.change} currency={this.props.navigation.state.params._currency}
                                      currentBalance={this.props.navigation.state.params._balance}/>
            </Card>
        }
        return null
    }

    getBalances = () => {
        if (this.state.loaded && this.state._payload.balances.length > 0) {
            return <Card>
                <Balance navigation={this.props.navigation} balances={this.state._payload.balances}
                         currency={this.props.navigation.state.params._currency}></Balance>
            </Card>
        }
        return null

    }

    render() {
        return (
            <Container style={Ui.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Accounts')}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title
                        style={{textAlign: 'left'}}>{I18n.t('_balance') + ' ' + I18n.t('for') + ' ' + this.props.navigation.state.params._username}</Title>
                    </Body>


                </Header>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>

                    {this.getChart()}
                    {this.getBalances()}


                </ScrollView>
            </Container>
        );
    }
}

export default PreviousBalance;