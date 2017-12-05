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

class MyAccount extends Component {
    render() {
        console.log('my account')
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
                <SafeBalance></SafeBalance>
                <Balance></Balance>
                <BrokerageBalance></BrokerageBalance>

            </Container>
        );
    }
}

export default MyAccount;
