import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import {View} from 'react-native';
import {Container, Header, Content, Card, CardItem, Text, Right} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
class ListItem extends Component {
    render() {
        return <View style={styles.listItem}>
            <View
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:40,
                    height:40,
                    backgroundColor:'#f36523',
                    borderRadius:40,
                }}
            >
                <MaterialCommunityIcons name={"currency-usd"}  size={30} color="#fff" />
            </View>
            <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>{I18n.t('cashBalance')}</Text>
                <Text style={styles.balanceValue}>{this.props._cash_balance}</Text>
            </View>
            <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>{I18n.t('moneyInAccounts')}</Text>
                <Text style={styles.balanceValue}>{this.props._money_in_accounts} {this.props._currency}</Text>
            </View>
        </View>

    }
}
export default ListItem;