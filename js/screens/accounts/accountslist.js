import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import styles from "./styles";
import {SimpleLineIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, Content,  List, ListItem, Separator, Right, Left, Body} from "native-base";
import Ui from '../../common/ui';

const accountTypes = ['sport']
const listOrder = ['_site', '_username', '_currency', '_credit', '_balance', '_last_status']
import Controller from '../../../Controller';

class AccountsList extends Component {

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
                        {account._type == '0' ?
                            <MaterialCommunityIcons name="soccer" size={28} style={Ui.headerIcon}/> :
                             <SimpleLineIcons name="user" size={20} style={Ui.headerIcon}/>}
                    </View>
                </Col>
                <Col size={4} >
                    <Row>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel, Ui.labelSmallest, Ui.itemLabelLight]}>{I18n.t(accountTypes[account._type]).toUpperCase()}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.labelSmallest, Ui.itemLabelLight]}>{account._last_status.split(' ')[0]}</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:5}}>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel, Ui.itemLabelDark, Ui.bold]}>{account._site}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.balanceValueSmall, Ui.itemLabelDark, Ui.bold]}>{account._credit} {account._currency}</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:5, marginBottom:0}}>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={Ui.itemLabel}>{account._username}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.profitValue]}>{account._balance} {account._currency}</Text>

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
