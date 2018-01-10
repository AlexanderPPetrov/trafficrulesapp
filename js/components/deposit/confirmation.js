import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
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

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class Confirmation extends Component {

    render() {
        return (

            <View style={{marginBottom:30}}>
                <View style={[styles.withdrawHeader, styles.centered]} >
                    <Icon active name='ios-checkmark-circle' style={styles.successIcon}/>
                    <Text style={{textAlign:'center', fontSize:20}}>{I18n.t('depositConfirmation')}</Text>
                </View>
                <Text style={styles.confirmationText}>
                    {I18n.t('depositSuccess')}
                </Text>
                <Text style={styles.confirmationText}>
                    {I18n.t('depositSuccessTwo')}
                </Text>

            </View>

        );
    }
}

export default Confirmation;
