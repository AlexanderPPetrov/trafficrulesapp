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
import Api from "../../../Api";

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
   // get-account-balances
   //  _id

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                balances:[]
            }

        }
    }

    componentDidMount = () => {
        Api.get({
            url: 'get-account-balances',
            data:{
                account_id: this.props.navigation.state.params._id
            },
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) =>{
        this.setState({
            _payload:response
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Accounts')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('balance') + ' ' + I18n.t('for') + ' ' + this.props.navigation.state.params._username}</Title>
                    </Body>
                    <Right/>

                </Header>
                <Balance navigation={this.props.navigation} balance={this.state._payload.balances} currency={this.props.navigation.state.params._currency}></Balance>
            </Container>
        );
    }
}

export default PreviousBalance;
