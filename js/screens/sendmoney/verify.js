import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Form,
    Picker,
    Item,
    Text,
    H3,
    Button,
    Icon,
    Input,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
} from "native-base";

import {View} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import AmountTable from '../../common/confirmation/amounttable'

import Ui from '../../common/ui';
import {normalize} from '../../common/ui';

class Confirmation extends Component {

    constructor(props) {
        super(props);
    }

    getAmountTable = () => {
        let fee = this.props.fee;
        if(fee === null || fee === ''){
            fee = 0
        }
        const netAmount = parseFloat(this.props.amount - fee)
        return <AmountTable amount={this.props.amount} netAmount={netAmount} fee={fee} currency={this.props.currency}/>

    }
    render() {
        return (

            <View >
                <Text style={Ui.stepHeader}>{I18n.t('confirmation')}</Text>
                <View>
                    <Grid>
                        <Row style={[Ui.centered, {marginBottom:5}]}>
                            <Text>{I18n.t('recipient')}</Text>
                        </Row>
                        <Row style={Ui.centered}>
                            <Text style={[Ui.bold, Ui.itemLabelDark, {fontSize: normalize(18)}]}>{this.props.email}</Text>
                        </Row>
                    </Grid>
                </View>
                {this.getAmountTable()}
            </View>

        );
    }
}

export default Confirmation;
