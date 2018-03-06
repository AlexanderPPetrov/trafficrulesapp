import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, List, ListItem, Card, Content} from "native-base";
import Ui from '../../common/ui';
import Api from '../../../Api';
import ColorScheme from '../../common/colorscheme';



class Balance extends Component {


    constructor(props){
        super(props)
    }

    getProfitStyle = (profit) => {
        let style = Ui.textWin;
        if(parseFloat(profit) < 0){
            style = Ui.textLoss
        }
        if(parseFloat(profit) == 0){
            style = Ui.textDraw
        }
        return style
    }

    getBetStyle = (profit) => {
        let style = Ui.betWin;
        if(parseFloat(profit) < 0){
            style = Ui.betLoss
        }
        if(parseFloat(profit) == 0){
            style = Ui.betDraw
        }
        return style
    }

    getBalanceItem = (balance, i) => {

        let date = Api.getDate(balance._date_created),
            dayDate = date.getDate(),
            month = date.getMonth(),
            monthAbbr = Api.getMonthAbbr(month);


        return  <View  key={i} style={[Ui.profitHistoryContainer, this.getBetStyle(balance._change)]}>
                <Grid>
                    <Col size={1} style={{justifyContent:'center'}}>
                        <Text style={Ui.dayLabel}>{dayDate}</Text>
                        <Text style={Ui.monthLabel}>{monthAbbr}</Text>
                    </Col>
                    <Col size={4} >
                        <Row>
                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('_balance')}</Text>
                            </Col>
                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.balanceValue, Ui.profitValue, Ui.itemLabelDark, this.getProfitStyle(balance._balance)]}>{balance._balance} {this.props.currency}</Text>
                            </Col>
                            {/*<Col style={Ui.currencyWidth} >*/}
                                {/*<Text style={[Ui.balanceCurrency, Ui.itemLabelDark]}>{this.props.currency}</Text>*/}
                            {/*</Col>*/}
                        </Row>
                        <Row>

                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('change')}</Text>
                            </Col>
                            <Col size={3} style={{justifyContent:'center'}}>
                                <Text style={[Ui.balanceValue, Ui.profitValue, this.getProfitStyle(balance._change)]}>{balance._change} {this.props.currency}</Text>
                            </Col>
                            {/*<Col style={Ui.currencyWidth}>*/}
                                {/*<Text style={[Ui.balanceCurrency, this.getProfitStyle(balance._change)]}>{this.props.currency}</Text>*/}
                            {/*</Col>*/}

                        </Row>
                    </Col>
                </Grid>
            </View>
    };

    getBalanceList = (balances) => {
        let opacity = 0;
        if (balances.length > 0) {
            opacity = 1
        }
        const listItems = balances.map((balance, i) =>
            this.getBalanceItem(balance, i)
        );
        return (
            <View style={{opacity: opacity}}>{listItems}</View>
        );
    };

    render() {
        return (
            <Content style={{borderTopWidth:1, borderTopColor:ColorScheme.listItemBorderColor}}>
                {this.getBalanceList(this.props.balances)}
            </Content>

        );
    }
}

export default Balance;
