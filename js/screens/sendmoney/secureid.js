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

class SecureId extends Component {

    componentDidMount = () => {
        if(this.props.secureId === '' ){
            if(this.refs.secureIdInput){
                this.refs.secureIdInput._root.focus()
            }
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
    }

    render() {
        return (
            <View >
                <Text style={Ui.formLabel}>{I18n.t('enterSecureId')}</Text>
                <Form style={Ui.form}>
                    <Item style={Ui.inputContainer}>
                        <Input ref="secureIdInput" style={Ui.inputField} value={this.props.secureId} onChangeText={(text) => this.props.changeValue('secureId', text)}/>
                    </Item>
                </Form>
            </View>
        );
    }
}

export default SecureId;
