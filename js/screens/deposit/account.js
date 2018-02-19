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
import Ui from '../../common/ui';

class Account extends Component {

    componentDidMount = () => {
        if(this.props.account == '' || (this.props.secureId == '' && this.props.paymentMethod == 'NT')){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
        setTimeout(()=> {
            if(this.accountInput && this.accountInput._root && this.props.account == ''){
                this.accountInput._root.focus()
            }
        }, 500)

        console.log('account did mount')

    }

    getSecureIdField = () => {

        if(this.props.paymentMethod == 'NT'){
            return <Form style={Ui.form}>
                <Item style={[Ui.inputContainer, styles.inputSecureId]}>
                    <Input style={Ui.inputField} placeholderTextColor={ColorScheme.lighter} placeholder={I18n.t('secureId')} value={this.props.secureId} keyboardType='numeric' onChangeText={(text) => this.props.onValueChange('secureId', text) }/>
                </Item>
            </Form>
        }
        return null
    }

    render() {
        return (
            <View >
                <Text style={Ui.stepHeader}>{I18n.t('accountSettings')}</Text>
                <Text style={Ui.formLabel}>{I18n.t('enterAccount')}</Text>
                <Form style={Ui.form}>
                    <Item style={Ui.inputContainer}>
                        <Input style={Ui.inputField} getRef={(input) => this.accountInput = input} placeholderTextColor={ColorScheme.lighter} placeholder={I18n.t('emailOrId')} value={this.props.account} onChangeText={(text) => this.props.onValueChange('account', text)}/>
                    </Item>
                </Form>
                {this.getSecureIdField()}
            </View>

        );
    }
}

export default Account;
