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
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {View, ScrollView, RefreshControl} from 'react-native';


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
            refreshing: false

        }
    }

    componentDidMount = () => {

        this.loadData()

    };

    loadData = () => {
        Api.get({
            url: 'get-account-balances',
            data: {
                account_id: this.props.navigation.state.params._id
            },
            success: this.dataLoaded,
            always: this.setRefreshing
        })
    };

    dataLoaded = (response) => {
        this.setState({
            _payload: response
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData()
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Accounts')}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('_balance') + ' ' + I18n.t('for') + ' ' + this.props.navigation.state.params._username}</Title>
                    </Body>
                    <Right/>

                </Header>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    <Balance navigation={this.props.navigation} balances={this.state._payload.balances}
                             currency={this.props.navigation.state.params._currency}></Balance>
                </ScrollView>
            </Container>
        );
    }
}

export default PreviousBalance;
