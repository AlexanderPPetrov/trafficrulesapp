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

import {AsyncStorage, BackHandler, Alert} from "react-native"
import Tabs from "./tabs";
import Api from "../../../Api";

class MyAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                balances: []
            },
            pieChartData: [],
            refreshing: false,
            loaded: false
        }
    }

    componentDidMount = () => {
        this.loadData()
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    loadData = (loader = true) => {
        Api.get({
            url: 'get-member-details',
            success: this.dataLoaded,
            always: this.setRefreshing,
            loader: loader
        })
    };

    confirmExit = () => {
        Alert.alert(
            I18n.t('exitTitle'),
            I18n.t('exitQuestion'),
            [
                {text:I18n.t('cancel')},
                {text:I18n.t('ok'), onPress:() => BackHandler.exitApp()}
            ]
        )
    }

    handleBackButton = () => {
        this.confirmExit()
        return true;
    };
    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData(false)
    };

    dataLoaded = (response) => {

        let pieChartData = _.reject(response.balances, {_total_in_eur:0})
        console.log('pieChartData', pieChartData)
        var result = pieChartData.map(balance => ({ x: balance._currency, y: balance._total_in_eur }));
        this.setState({
            _payload: response,
            pieChartData: result,
            loaded: true
        })

        AsyncStorage.setItem('accountSettings', JSON.stringify(response))
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

                <Tabs loaded={this.state.loaded} balances={this.state._payload.balances} data={this.state.pieChartData} refreshing={this.state.refreshing} _payload={this.state._payload} onRefresh={this.onRefresh}></Tabs>


            </Container>
        );
    }
}

export default MyAccount;
