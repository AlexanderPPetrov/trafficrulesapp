import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import {
    Text
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from "./styles";

class SafeBalance extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={[styles.mainBalance, styles.safeBalance]}>

                <Grid>
                    <Row>
                        <Text style={styles.mainBalanceLabel}>
                            {I18n.t('safeBalance')}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={styles.mainBalanceValue}>
                            {this.props._safe_balance} {this.props._currency}
                        </Text>
                    </Row>
                </Grid>

            </View>
        );
    }
}

export default SafeBalance;