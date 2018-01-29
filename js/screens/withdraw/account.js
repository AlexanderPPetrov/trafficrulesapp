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
        if(this.props.account == '' ){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
    }

    render() {
        return (

            <View >
                <Text style={Ui.formLabel}>{I18n.t('accountSettings')}</Text>
                <Form style={Ui.form}>
                    <Item style={Ui.inputContainer}>
                        <Input style={Ui.inputField} placeholderTextColor={ColorScheme.lighter} placeholder={I18n.t('emailOrId')} value={this.props.account} onChangeText={(text) => this.props.onValueChange('account', text)}/>
                    </Item>
                </Form>
            </View>

        );
    }
}

export default Account;
