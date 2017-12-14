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

class PreviousBalance extends Component {

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
                    <Title>{I18n.t('_balance') + ' ' + I18n.t('for') + ' ' + this.props.navigation.state.params._username}</Title>
                    </Body>
                    <Right/>

                </Header>
                <Content padder>
                    <Balance navigation={this.props.navigation} balances={this.state._payload.balances} currency={this.props.navigation.state.params._currency}></Balance>
                </Content>
            </Container>
        );
    }
}

export default PreviousBalance;
