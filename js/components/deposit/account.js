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
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Input
} from "native-base";
import {View, ScrollView} from 'react-native';
import ColorScheme from "../../common/colorscheme";
import styles from "./styles";

class Account extends Component {

    componentDidMount = () => {
        if(this.props.account == '' || (this.props.secureId == '' && this.props.paymentMethod == 'NT')){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
    }

    getSecureIdField = () => {

        if(this.props.paymentMethod == 'NT'){
            return <Form style={styles.form}>
                <Item style={[styles.inputContainer, styles.inputSecureId]}>
                    <Input style={styles.inputField} placeholderTextColor={ColorScheme.lighter} placeholder={I18n.t('secureId')} value={this.props.secureId} keyboardType='numeric' onChangeText={(text) => this.props.onValueChange('secureId', text) }/>
                </Item>
            </Form>
        }
        return null
    }

    render() {
        return (
            <View >
                <Text style={styles.stepHeader}>{I18n.t('accountSettings')}</Text>
                <Text style={styles.formLabel}>{I18n.t('enterAccount')}</Text>
                <Form style={styles.form}>
                    <Item style={styles.inputContainer}>
                        <Input style={styles.inputField} placeholderTextColor={ColorScheme.lighter} placeholder={I18n.t('emailOrId')} value={this.props.account} onChangeText={(text) => this.props.onValueChange('account', text)}/>
                    </Item>
                </Form>
                {this.getSecureIdField()}
            </View>

        );
    }
}

export default Account;
