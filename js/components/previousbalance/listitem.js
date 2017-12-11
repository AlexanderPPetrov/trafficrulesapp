import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import {Text, View} from 'react-native';

class ListItem extends Component {
    render() {
        return <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>
                {I18n.t(this.props.label)}
            </Text>
            <Text style={[styles.balanceValue, styles[this.props.color]]}>
                {this.props.value}
            </Text>
        </View>
    }
}
export default ListItem;