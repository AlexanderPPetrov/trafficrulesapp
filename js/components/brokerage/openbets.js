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
    Card, CardItem, List, ListItem, Separator,
    Left,
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import { ScrollView, RefreshControl  } from "react-native";

import styles from "./styles";
import Tabs from "./tabs";
import Api from "../../../Api";


class OpenBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _payload: {
                bets: []
            },
            refreshing: false
        }
    }

    componentDidMount = () => {
        this.loadData()
    }

    loadData = () => {
        Api.get({
            url: 'get-brokerage-open-bets',
            success: this.dataLoaded,
            always: this.setRefreshing
        })
    }

    setRefreshing = () => {
        this.setState({refreshing: false})
    }
    dataLoaded = (response) => {
        this.setState({
            _payload: response
        })

    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.loadData()
    }

    getListItem = (bet, i) => {
        return <ListItem key={i}>
            <Grid style={{height:170}}>
                    <Row>
                        <Text>{I18n.t('betNumber')} {bet._id}</Text>
                    </Row>
                    <Row>
                        <Col size={3}>
                            <Text style={styles.betLabel}>{bet._selection}</Text>
                        </Col>
                        <Col size={2} >
                            <Text style={styles.betValue}>{bet._score}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={3} >
                            <Text style={styles.betLabel}>{bet._event}</Text>
                        </Col>
                        <Col size={2} >
                            <Text style={styles.betValue}>{bet._event_date}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={3} >
                            <Text style={styles.betLabel}>{I18n.t('stake')}: {bet._stake} {bet._currency}</Text>
                        </Col>
                        <Col size={2} >
                            <Text style={styles.betValue}>{I18n.t('running').toUpperCase()}</Text>
                        </Col>
                    </Row>
            </Grid>


        </ListItem>
    }

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );
        return (
            <List>
                {betList}
            </List>
        );
    };


    render() {
        return (
            <ScrollView  refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />
            }>
                {this.getBetList(this.state._payload.bets)}
            </ScrollView>
        );
    }
}

export default OpenBets;
