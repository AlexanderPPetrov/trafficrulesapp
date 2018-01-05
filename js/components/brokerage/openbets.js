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
import { ScrollView, RefreshControl, View } from "react-native";
import Ui from '../../common/ui';

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
    };

    loadData = () => {
        Api.get({
            url: 'get-brokerage-open-bets',
            success: this.dataLoaded,
            always: this.setRefreshing
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false})
    };

    dataLoaded = (response) => {
        this.setState({
            _payload: response
        })

    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData()
    };

    getListItem = (bet, i) => {
        return <Card key={i}>
            <Grid style={{height:170}}>
                    <Row style={{marginBottom:10}}>
                        <Text style={Ui.cardHeader}>{I18n.t('betNumber')}</Text>
                        <Text style={[Ui.cardHeader, styles.betId]}>{bet._id}</Text>
                    </Row>
                    <Row style={styles.selectionContainer}>
                        <Col size={3}>
                            <Text style={styles.betLabel}>{bet._selection}</Text>
                        </Col>
                        <Col size={2} >
                            <Text style={styles.betValue}>{bet._score}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.matchContainer}>
                        <Col size={3} >
                            <Text style={[styles.betLabel, styles.eventLabel]}>{bet._event}</Text>
                        </Col>
                        <Col size={2} >
                            <Text style={[styles.betValue, styles.dateLabel]}>{bet._event_date.split(' ')[0]}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.infoContainer}>
                        <Col size={3} >
                            <Text style={styles.betLabel}>{I18n.t('stake')}: {bet._stake} {bet._currency}</Text>
                        </Col>
                        <Col size={2} >
                            <Text style={styles.statusLabel}>{I18n.t('running').toUpperCase()}</Text>
                        </Col>
                    </Row>
            </Grid>
        </Card>
    };

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );
        if (bets.length == 0) {
            return <Text style={{textAlign:'center', padding:10, alignSelf: "stretch"}}>{I18n.t('noRunningBets')}</Text>;
        }
        return (
            <View>
                {betList}
            </View>
        );
    };


    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                {this.getBetList(this.state._payload.bets)}
            </ScrollView>
        );
    }
}

export default OpenBets;
