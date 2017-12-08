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
            _safe_balance: '',
            _pending_balance: '',
            _currency: ''
        }
    }

    componentDidMount() {
        Api.get({
            url: 'get-member-details',
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) => {
        console.log('########################', this)
        this.setState({
            _safe_balance: response._safe_balance,
            _currency: response._currency
        })
        console.log(response)
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
                <SafeBalance data={this.state}></SafeBalance>
                <Balance></Balance>
                <BrokerageBalance></BrokerageBalance>

            </Container>
        );
    }
}

export default MyAccount;
