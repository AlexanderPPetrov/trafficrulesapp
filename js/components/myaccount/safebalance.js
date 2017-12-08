import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import {
    Text
} from "native-base";

import styles from "./styles";

class SafeBalance extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={[styles.balancePadding, styles.safeBalanceContainer]}>

                <Text>
                    {I18n.t('safeBalance')}
                </Text>
                <Text>
                    {this.props._safe_balance} {this.props._currency}
                </Text>

            </View>
        );
    }
}

export default SafeBalance;
