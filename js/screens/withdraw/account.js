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
import {View} from 'react-native';
import Ui from '../../common/ui';

class Account extends Component {

    componentDidMount = () => {
        if(this.props.account == '' ){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }

        if(this.refs.accountInput && this.props.account == ''){
            this.refs.accountInput._root.focus()
        }
    }



    render() {
        return (

            <View >
                <Text style={Ui.stepHeader}>{I18n.t('accountSettings')}</Text>
                <Form style={Ui.form}>
                    <Text style={Ui.formLabel}>{I18n.t('emailOrId')}</Text>
                    <Item style={Ui.inputContainer}>
                        <Input ref="accountInput" style={Ui.inputField} value={this.props.account} onChangeText={(text) => this.props.onValueChange('account', text)}/>
                    </Item>
                </Form>
            </View>

        );
    }
}

export default Account;
