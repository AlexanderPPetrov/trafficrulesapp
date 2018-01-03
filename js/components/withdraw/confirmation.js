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

            <View >
                <View style={styles.withdrawHeader} >
                    <Text style={{textAlign:'center'}}>{I18n.t('confirmation')}</Text>
                </View>
                <Text>
                    {I18n.t('withdrawSuccess')}
                </Text>
                <Text>
                    {I18n.t('withdrawSuccessTwo')}
                </Text>

            </View>

        );
    }
}

export default Confirmation;
