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
import { NavigationActions } from 'react-navigation';
import {Grid, Row, Col} from "react-native-easy-grid";

import Balance from "./balance";
import styles from "./styles";
const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
        NavigationActions.navigate({ routeName: 'PreviousBalance'}),
        NavigationActions.navigate({ routeName: 'Accounts'})
    ]
})
const balanceData = {
    "_status": "success",
    "payload": {
        "_account_id":123123,
        "_currency":"EUR",
        "balances":[{
            "_balance":4000,
            "_change":309,
            "_date":"2016-02-24"
        }]
    }
};

class PreviousBalance extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.dispatch(resetAction)}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    {/*<Title>{I18n.t('balance') + ' ' + I18n.t('for') + ' ' + this.props.navigation.state.params._username}</Title>*/}
                    </Body>
                    <Right/>

                </Header>
                <Balance navigation={this.props.navigation} balance={balanceData.payload.balances} currency={balanceData.payload._currency}></Balance>
            </Container>
        );
    }
}

export default PreviousBalance;
