import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import _ from "lodash";

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
    Right,
    Card,
    Body,
    CardItem
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";

import {BackHandler, Alert} from "react-native"
import Api from "../../../Api";
import Ui from '../../common/ui';
import Header from '../../common/header/header';
import MainBalance from "./mainbalance";

class MyAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                balances: [],
                _safe_balance:'',
                _brokerage_balance:''
            },
            pieChartData: [],
            refreshing: false,
            loaded: false
        }
    }

    componentDidMount = () => {
        this.loadData()
        this.checkIfLocaleSet()
    };

    checkIfLocaleSet = () => {
        if(Api.setLocale){
            Api.post({
                url: 'set-member-language',
                success: (response)=> console.log('language changed to', response._language),
                data: {language: I18n.locale}
            })
        }
    }

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
            I18n.t('confirm'),
            I18n.t('confirmExit'),
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

        if(!response._brokerage_balance){
            response._brokerage_balance = '-'
        }

        let pieChartData = _.reject(response.balances, {_total_in_eur:0})
        var result = pieChartData.map(balance => ({ x: balance._currency, y: balance._total_in_eur }));
        this.setState({
            _payload: response,
            pieChartData: result,
            loaded: true
        })

        Api.accountSettings = response;
    };

    render() {
        return (
            <Container style={Ui.container}>
                <Header
                    hasTabs
                    title={I18n.t('myAccount')}
                    indicatorRoute={'MyAccount'}
                    navigation={this.props.navigation}
                />

                {/*<Tabs loaded={this.state.loaded} balances={this.state._payload.balances} data={this.state.pieChartData} refreshing={this.state.refreshing} _payload={this.state._payload} onRefresh={this.onRefresh}></Tabs>*/}
                <MainBalance
                    loaded={this.state.loaded}
                    refreshing={this.state.refreshing}
                    _payload={this.state._payload}
                    onRefresh={this.onRefresh}
                />

            </Container>
        );
    }
}

export default MyAccount;
