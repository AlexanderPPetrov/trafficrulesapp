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

import SportAccount from "./accountslist";
import styles from "./styles";
import Api from "../../../Api";


class Accounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                accounts:[]
            }
        }
    }

    componentDidMount = () => {
        Api.get({
            url: 'get-member-accounts',
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
                    <Title>{I18n.t('accounts')}</Title>
                    </Body>
                    <Right/>

                </Header>
                <SportAccount navigation={this.props.navigation} accounts={this.state._payload.accounts}></SportAccount>

            </Container>
        );
    }
}

export default Accounts;
