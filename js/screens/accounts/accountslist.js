import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {Text, View} from 'react-native';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, Content,  List, ListItem, Separator, Right, Left, Body} from "native-base";
import Ui from '../../common/ui';

import Controller from '../../../Controller';

class AccountsList extends Component {


    getIcon = (account) => {

        if(account._type == '1') return <MaterialCommunityIcons name="soccer" size={28} style={Ui.headerIcon}/>

        if(account._site.indexOf('Brokerage') !== -1 || account._site.indexOf('brokerage') !== -1) return <Ionicons name="ios-briefcase-outline" size={26} style={Ui.headerIcon}/>

        return <MaterialCommunityIcons name="soccer" size={28} style={Ui.headerIcon}/>

    }

    getAccountType = (account) => {
        let accountType = 'sport'
        if(account._type == '1') accountType = 'agent';

        if(account._site == 'Brokerage' || account._site == 'brokerage') accountType = 'brokerage'

        return I18n.t(accountType).toUpperCase()
    }

    getCard = (account, i) => {

        return <ListItem button key={i} style={Ui.transactionsContainer}    onPress={() => Controller.navigateTo("PreviousBalance", {
                                             _id: account._id,
                                            _username: account._username,
                                          _currency: account._currency,
                                           _balance: account._balance
                                    })}>
            <Grid>
                <Col size={1} style={{alignItems:'center'}}>
                    <View style={Ui.iconContainer}>
                        {this.getIcon(account)}

                    </View>
                </Col>
                <Col size={4} >
                    <Row>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel, Ui.itemLabelDark, Ui.bold]}>{account._site}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.itemLabelDark, Ui.bold]}>{account._username}</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:5}}>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={Ui.itemLabel}>{I18n.t('_credit')}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.profitValue]}>{parseInt(account._credit)} {account._currency}</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:5, marginBottom:0}}>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel]}>{I18n.t('balance')}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.profitValue]}>{account._balance} {account._currency}</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:5, marginBottom:0}}>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel, Ui.labelSmallest, Ui.itemLabelLight]}>{I18n.t('_last_status')}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.labelSmallest, Ui.itemLabelLight]}>{account._last_status.split(' ')[0]}</Text>
                        </Col>
                    </Row>
                </Col>
            </Grid>
        </ListItem>
    };

    getAccountCards = (accounts) => {
        let cardsList = accounts.map((account, i) =>
            this.getCard(account, i)
        );
        return (
            <List>
                {cardsList}
            </List>
        );
    };

    render() {
        return (
            this.getAccountCards(this.props.accounts)
        );
    }
}

export default AccountsList;
