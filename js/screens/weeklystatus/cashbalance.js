import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import {View} from 'react-native';
import {Container, Header, Content, Card, CardItem, Text, Right, ListItem} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Ui from '../../common/ui';
import CurrencyIcon from '../../common/currency/currency';

class CashBalance extends Component {

    getCurrencyIcon = () => {
        return <CurrencyIcon color='#fff' size={26} currency={this.props.currency}/>
    };

    render() {
        return <Grid style={Ui.listItem}>
                <Col style={{width:60}}>
                    <View style={[Ui.iconContainer, Ui[this.props.currency]]}>
                        {this.getCurrencyIcon()}
                    </View>
                </Col>
                <Col size={1} style={{justifyContent:'center'}}>
                    <Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{this.props.currency}</Text>
                </Col>
                <Col size={1} style={{justifyContent:'center', alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[Ui.balanceValue, Ui.itemLabelDark]}>{this.props.amount}</Text>
                        <Text style={[Ui.balanceCurrency, Ui.itemLabelDark, Ui.currencyWidth]}>{this.props.currency}</Text>
                    </View>
                </Col>

        </Grid>

    }
}

export default CashBalance;