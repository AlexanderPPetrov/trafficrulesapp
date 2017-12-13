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
    Card,
    Body,
    CardItem
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";

import {View} from "react-native"
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
                <Content padder>
                    <Card>
                        {/*<CardItem header>*/}
                            {/*<Text>{I18n.t('mainBalance')}</Text>*/}
                        {/*</CardItem>*/}
                        <View style={styles.cardBody}>
                            <SafeBalance _safe_balance={this.state._payload._safe_balance} _currency={this.state._payload._currency}></SafeBalance>
                            <BrokerageBalance _brokerage_balance={this.state._payload._brokerage_balance} _currency={this.state._payload._brokerage_currency}></BrokerageBalance>
                        </View>
                    </Card>
                    <Balance balances={ this.state._payload.balances }></Balance>

                </Content>

            </Container>
        );
    }
}

export default MyAccount;
