import React, { Component } from "react";
import I18n from '../../../i18n/i18n';
import { View } from "react-native";
import {
  Text
} from "native-base";

import styles from "./styles";
class SafeBalance extends Component {
  render() {
    return (
      <View style={[styles.balancePadding, styles.safeBalanceContainer]}>

        <Text>
            {I18n.t('safeBalance')}
        </Text>
          <Text>
            12378.70 EUR
          </Text>

      </View>
    );
  }
}

export default SafeBalance;
