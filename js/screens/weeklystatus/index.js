import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Header from '../../common/header/header';

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
    Card, CardItem, List, ListItem,
    Left,
    Right,
    Body
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {ScrollView, View} from "react-native";
import Ui, {normalize} from '../../common/ui';

import MainBalance from "../../common/balanceheader/mainbalance";
import CashBalance from "./cashbalance";
import AccountsBalance from "./accountsbalance";

class WeeklyStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weekly_status: {
                cash_balances: [],
                accounts_balances: {},
                totals: [],
                _safe_balance: "",
                _safe_balance_currency: "",
                _report_date:""
            }
        }
    }

    componentDidMount = () => {
        this.setState({
            weekly_status: this.props.navigation.state.params
        })
    }

    getCashBalance = (key, title) => {
        const switchList = this.state.weekly_status[key].map((balance, i) => {
            return <CashBalance key={i}
                        amount={balance._balance}
                        currency={balance._currency}
                />
        });

        return <List>
            <View style={[Ui.listItem, Ui.listHeader]}>
                <Text >{I18n.t(title)}</Text>
            </View>
            {switchList}
        </List>
    };

    getAccountsBalance = () => {
        let accountsList = [];
        let index = 0;
        for (let [k, v] of Object.entries(this.state.weekly_status.accounts_balances)) {

            for(let [key, value] of Object.entries(v)){
                index++;

                if(key === '_total_balance') continue;
                let item = <AccountsBalance key={index} account={value}/>

                accountsList.push(item)
            }

            const total = <View key={k} style={Ui.listItem}>
                    <Grid>
                        <Col size={2}>
                            <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('total')}</Text>
                        </Col>
                        <Col>
                            <Text style={[Ui.balanceValue, Ui.profitValue, Ui.bold]}>{v._total_balance} {k}</Text>
                        </Col>
                    </Grid>
                </View>

            accountsList.push(total)
        }

        return <List>
            <View style={[Ui.listItem, Ui.listHeader]}>
                <Text >{I18n.t('balanceInAccounts')}</Text>
            </View>
            {accountsList}
        </List>
    }

    render() {
        return (
            <Container style={Ui.container}>
                <Header
                    title={I18n.t('weeklyStatus')}
                />
                <ScrollView>
                    <View style={Ui.listItem}>
                        <Col>
                            <Text style={Ui.itemLabel}>{I18n.t('statusReportFor')}</Text>
                        </Col>
                        <Col >
                            <Text style={[Ui.balanceValue, Ui.profitValue, Ui.bold]}>{this.state.weekly_status._report_date}</Text>
                        </Col>
                    </View>
                    <View style={[Ui.mainBalanceHeaderContainer, Ui.dropShadow]}>
                        <MainBalance title={I18n.t('safeBalance')}
                                     balance={this.state.weekly_status._safe_balance}
                                     currency={this.state.weekly_status._safe_balance_currency}/>
                    </View>

                    {this.getCashBalance('cash_balances','cashBalance')}
                    {this.getAccountsBalance()}
                    {this.getCashBalance('totals','total')}
                    <View style={[Ui.centered, {padding:15, paddingTop:20}]}>
                            <Text style={{fontSize:normalize(14), textAlign:'center'}}>{I18n.t('weeklyBalanceText')}</Text>
                    </View>
                    <View style={[Ui.centered,  {marginTop:5, marginBottom:15, padding:15}]}>
                        <Text style={Ui.bold}>{I18n.t('premiumTradingsTeam')}</Text>
                    </View>
                </ScrollView>
            </Container>

        );
    }
}

export default WeeklyStatus;
