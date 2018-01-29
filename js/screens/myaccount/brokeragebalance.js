import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import {
    Text
} from "native-base";

import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from "./styles";
import Ui from '../../common/ui';

class BrokerageBalance extends Component {
    render() {
        return (
            <View style={[styles.mainBalance, styles.brokerageBalance]}>
                <Grid>
                    <Row>
                        <Text style={Ui.cardHeader}>
                            {I18n.t('brokerageBalance')}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={Ui.mainBalanceValue}>
                            {this.props._brokerage_balance}
                        </Text>
                        <Text style={Ui.mainBalanceCurrency}>{this.props._currency}</Text>
                    </Row>
                </Grid>
            </View>
        );
    }
}

export default BrokerageBalance;
