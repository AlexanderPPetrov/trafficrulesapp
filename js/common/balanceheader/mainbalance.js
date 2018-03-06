import React, {Component} from "react";
import {View} from "react-native";
import {
    Text
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Ui from '../ui';
import ColorScheme from '../colorscheme';

class MainBalance extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={Ui.mainBalanceContainer}>
                <Text style={Ui.balanceHeader}>
                    {this.props.title}
                </Text>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'center'}}>
                    <Text style={Ui.mainBalanceValue}>
                        {this.props.balance}
                    </Text>
                    <Text style={{paddingBottom:5, paddingLeft:5, color: ColorScheme.darkest}}>{this.props.currency}</Text>
                </View>
            </View>

        );
    }
}

export default MainBalance;
