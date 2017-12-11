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

import SafeBalance from "./safebalance";
import Balance from "./balance";
import BrokerageBalance from "./brokeragebalance";
import styles from "./styles";
import Api from "../../../Api";

class MyAccount extends Component {

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
            url: 'get-member-details',
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
            <Container style={styles.container}>
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
                <Text>{this.state._safe_balance}</Text>
                <SafeBalance _safe_balance={this.state._payload._safe_balance} _currency={this.state._payload._currency}></SafeBalance>
                <Balance balances={ this.state._payload.balances }></Balance>
                <BrokerageBalance _brokerage_balance={this.state._payload._brokerage_balance} _currency={this.state._payload._brokerage_currency}></BrokerageBalance>

            </Container>
        );
    }
}

export default MyAccount;
