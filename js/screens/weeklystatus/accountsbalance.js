import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {Text, View} from 'react-native';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, Content,  List, ListItem, Separator, Right, Left, Body} from "native-base";
import Ui from '../../common/ui';

class AccountsBalance extends Component {

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

    render() {
        return <ListItem style={Ui.transactionsContainer} >
            <Grid>
                <Col size={1} style={{alignItems:'center'}}>
                    <View style={Ui.iconContainer}>
                        {this.getIcon(this.props.account)}
                    </View>
                </Col>
                <Col size={4} >
                    <Row>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel, Ui.labelSmallest, Ui.itemLabelLight]}>{this.getAccountType(this.props.account)}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.labelSmallest, Ui.itemLabelLight]}>{this.props.account._site}</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:5}}>
                        <Col size={2} style={{justifyContent:'center'}}>
                            <Text style={[Ui.itemLabel, Ui.itemLabelDark, Ui.bold]}>{this.props.account._username}</Text>
                        </Col>
                        <Col size={1} style={{justifyContent:'center'}}>
                            <Text style={[Ui.balanceValue, Ui.balanceValueSmall, Ui.itemLabelDark, Ui.bold]}>{this.props.account._balance} {this.props.account._currency}</Text>
                        </Col>
                    </Row>

                </Col>
            </Grid>
        </ListItem>
    }
}

export default AccountsBalance;
