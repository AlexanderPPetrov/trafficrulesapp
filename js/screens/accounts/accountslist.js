import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import {SimpleLineIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, Content,  List, ListItem, Separator, Right, Left, Body} from "native-base";
import Ui from '../../common/ui';

const accountTypes = ['sport']
const listOrder = ['_site', '_username', '_currency', '_credit', '_balance', '_last_status']
import Controller from '../../../Controller';

class AccountsList extends Component {


    getListItem = (account, property, i) => {
        let value = account[property];
        if(property === '_last_status'){
            value = value.split(' ')[0]
        }
        return <ListItem key={i} style={Ui.listItem}>
            <Col size={2}>
                <Text style={Ui.itemLabel}>{I18n.t(property)}</Text>
            </Col>
            <Col size={3}>
                <Text style={[Ui.balanceValue, Ui.balanceValueSmall]}>{value}</Text>
            </Col>
        </ListItem>
    }
    getCard = (account, i) => {
        let cardListItems = listOrder.map((property, i) =>
            this.getListItem(account, property, i)
        );
        return <View key={i}>
            <List >
                <ListItem itemDivider style={[Ui.listHeader, Ui.listHeaderExtended]}>
                    <Grid>
                        <Col style={{width: 30, justifyContent: 'flex-start'}}>
                            <View style={styles.headerIconContainer}>
                                {account._type == '0' ?
                                    <MaterialCommunityIcons name="soccer" size={28} style={Ui.headerIcon}/> :
                                    <SimpleLineIcons name="user" size={20} style={Ui.headerIcon}/>}
                            </View>
                        </Col>
                        <Col style={{justifyContent: 'center'}}>
                            <Text style={Ui.headerLabel}>{(I18n.t(accountTypes[account._type]) + ' ' + I18n.t('account')).toUpperCase()}</Text>
                        </Col>
                        <Col style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                            <Button style={styles.headerButton}
                                    onPress={() => Controller.navigateTo("PreviousBalance", {
                                        _id: account._id,
                                        _username: account._username,
                                        _currency: account._currency,
                                        _balance: account._balance
                                    })}>
                                <Text style={{color: '#fff'}}>{I18n.t('previousBalances')}</Text>
                            </Button>
                        </Col>
                    </Grid>

                </ListItem>
                {cardListItems}
            </List>
        </View>;
    };

    getAccountCards = (accounts) => {
        let cardsList = accounts.map((account, i) =>
            this.getCard(account, i)
        );
        return (
            <Content>
                {cardsList}
            </Content>
        );
    };

    render() {
        return (
            this.getAccountCards(this.props.accounts)
        );
    }
}

export default AccountsList;
