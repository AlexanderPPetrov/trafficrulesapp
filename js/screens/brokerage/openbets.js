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
import ColorScheme from '../../common/colorscheme';
import styles from "./styles";
import BetDetails from "./betdetails";
import Api from "../../../Api";


class OpenBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _payload: {
                bets: []
            },
            refreshing: false,
            loaded:false
        }
    }

    componentDidMount = () => {
        this.loadData()
    };

    loadData = (loader = true) => {
        Api.get({
            url: 'get-brokerage-open-bets',
            success: this.dataLoaded,
            always: this.setRefreshing,
            loader:loader
        })
    };

    setRefreshing = () => {
        this.setState({refreshing: false, loaded:false})
    };

    dataLoaded = (response) => {
        this.setState({
            _payload: response,
            loaded:true
        })

    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadData(false)
    };

    getListItem = (bet, i) => {
        return  <BetDetails key={i} bet={bet}/>
    };

    getBetList = (bets) => {
        let betList = bets.map((bet, i) =>
            this.getListItem(bet, i)
        );
        if (bets.length == 0 && this.state.loaded) {
            return <Text style={styles.noBets}>{I18n.t('noRunningBets')}</Text>;
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
