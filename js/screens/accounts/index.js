import React, {Component} from "react";
import {
    Container,
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
import {ScrollView, RefreshControl} from "react-native";
import SportAccount from "./accountslist";
import Api from "../../../Api";
import Ui from '../../common/ui';
import Header from '../../common/header/header';


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
        Header.setNavigation(this.props.navigation)
        this.navigationSubscribe = this.props.navigation.addListener(
            'willFocus',
            () => {
                Header.setRoute('Accounts')
            }
        );
    }

    componentWillUnmount = () => {
        this.navigationSubscribe.remove();
    }

    loadData = (loader = true) => {
        Api.get({
            url: 'get-member-accounts',
            success: this.dataLoaded,
            always: this.setRefreshing,
            loader: loader

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
        this.loadData(false)
    }

    render() {
        return (
            <Container style={Ui.container}>
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
