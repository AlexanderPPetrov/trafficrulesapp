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
    Item as FormItem,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {View, ScrollView} from 'react-native';
import Ui from '../../common/ui';

import styles from "./styles";

class Confirmation extends Component {

    getConfirmationPage = () => {
        if (this.props.depositCompleted == 'success') {
            return <View style={{alignItems: 'flex-start', alignSelf:'center', flex:1, flexDirection:'column'}}>
                <View style={{}}>
                    <View style={[Ui.confirmationHeader, Ui.centered]}>
                        <Icon active name='ios-checkmark-circle' style={Ui.successIcon}/>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{I18n.t('depositConfirmation')}</Text>
                    </View>
                    <View >
                        <Text>{I18n.t('amount')} {this.props._payload._amount} {this.props._payload._currency}</Text>
                        <Text>{I18n.t('fee')} {this.props._payload._fee} {this.props._payload._currency}</Text>
                        <Text>{I18n.t('netAmount')} {this.props._payload._net_amount} {this.props._payload._currency}</Text>
                    </View>

                    <Text style={Ui.confirmationText}>
                        {I18n.t('depositSuccess')}
                    </Text>
                    <Text style={Ui.confirmationText}>
                        {I18n.t('depositSuccessTwo')}
                    </Text>
                </View>
            </View>
        }
        return null
    }

    render() {
        return (

            this.getConfirmationPage()

        );
    }
}

export default Confirmation;
