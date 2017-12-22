import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import _ from "lodash";

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
    Right,
    Card,
    Body,
    CardItem
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";

import {View, ScrollView, RefreshControl} from "react-native"
import SafeBalance from "./safebalance";
import Balance from "./balance";
import BrokerageBalance from "./brokeragebalance";
import PieChartBalance from "./piechart";
import styles from "./styles";
import Api from "../../../Api";

class MyAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                balances: []
            },
            pieChartData: [],
            refreshing: false
        }
    }

    componentDidMount = () => {
        this.loadData()
    };

    loadData = () => {
        Api.get({
            url: 'get-member-details',
            success: this.dataLoaded,
            always: this.setRefreshing
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData()
    };

    dataLoaded = (response) => {

        let pieChartData = _.reject(response.balances, {_total_in_eur:0})
        console.log('pieChartData', pieChartData)
        var result = pieChartData.map(balance => ({ x: balance._currency, y: balance._total_in_eur }));
        this.setState({
            _payload: response,
            pieChartData: result
        })


    };


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('myAccount')}</Title>
                    </Body>
                    <Right/>

                </Header>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    <Content>
                        <View style={styles.cardBody}>
                            <SafeBalance _safe_balance={this.state._payload._safe_balance}
                                         _currency={this.state._payload._currency}></SafeBalance>
                            <BrokerageBalance _brokerage_balance={this.state._payload._brokerage_balance}
                                              _currency={this.state._payload._brokerage_currency}></BrokerageBalance>
                        </View>
                        <Balance balances={this.state._payload.balances}></Balance>
                        <PieChartBalance data={this.state.pieChartData}></PieChartBalance>
                    </Content>

                </ScrollView>


            </Container>
        );
    }
}

export default MyAccount;
