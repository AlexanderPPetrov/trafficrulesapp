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
        if(this.props.account == '' || (this.props.secureId == '' && this.props.paymentMethod == 'NT')){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
        if(this.refs.accountInput && this.props.account == ''){
            this.refs.accountInput._root.focus()
        }

        console.log('account did mount')

    }

    focusNext = () => {
        if(this.props.paymentMethod == 'NT' && !this.props.secureId && this.props.account !== ''){
            this.refs.secureId._root.focus()
        }
    }

    getSecureIdField = () => {

        if(this.props.paymentMethod == 'NT'){
            return <Form style={[Ui.form, {marginTop:25}]}>
                <Text style={Ui.formLabel}>{I18n.t('secureId')}</Text>
                <Item style={Ui.inputContainer}>
                    <Input ref="secureId" style={Ui.inputField} value={this.props.secureId} keyboardType='numeric' onChangeText={(text) => this.props.onValueChange('secureId', text) }/>
                </Item>
            </Form>
        }
        return null
    }

    render() {
        return (
            <View >
                <Text style={Ui.stepHeader}>{I18n.t('accountSettings')}</Text>
                <Form style={Ui.form}>
                    <Text style={Ui.formLabel}>{I18n.t('emailOrId')}</Text>
                    <Item style={Ui.inputContainer}>
                        <Input ref="accountInput" onBlur={()=> this.focusNext()} style={Ui.inputField} value={this.props.account} onChangeText={(text) => this.props.onValueChange('account', text)}/>
                    </Item>
                </Form>
                {this.getSecureIdField()}
            </View>

        );
    }
}

export default Account;
