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
    Input
} from "native-base";

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class Amount extends Component {

    componentDidMount = () => {
        if(this.props.amount == '' ){
            this.props.disableButton(true)
        }
    }

    render() {
        return (

            <View >
                <View style={styles.withdrawHeader} >
                    <Text style={{textAlign:'center'}}>{I18n.t('amount')}</Text>
                </View>
                <Form style={styles.formContainer}>
                    <Input placeholder="0" value={this.props.amount} onChangeText={(text) => this.props.onValueChange('amount', text)} keyboardType='numeric'/>
                </Form>
            </View>

        );
    }
}

export default Amount;
