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
import {View, ScrollView, RefreshControl} from "react-native";
import SportAccount from "./accountslist";
import styles from "./styles";
import Api from "../../../Api";


class Accounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                accounts:[]
            },
            refreshing:false
        }
    }

    componentDidMount = () => {
        this.loadData()
    }

    loadData = () => {
        Api.get({
            url: 'get-member-accounts',
            success: this.dataLoaded,
            always: this.setRefreshing

        })
    }

    dataLoaded = (response) =>{
        this.setState({
            _payload:response
        })
    }

    setRefreshing = () => {
        this.setState({refreshing: false})
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData()
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
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    <SportAccount navigation={this.props.navigation} accounts={this.state._payload.accounts}></SportAccount>

                </ScrollView>
            </Container>
        );
    }
}

export default Accounts;
