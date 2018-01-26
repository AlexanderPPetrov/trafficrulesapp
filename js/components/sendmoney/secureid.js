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

class SecureId extends Component {

    componentDidMount = () => {
        if(this.props.secureId === '' ){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
    }

    render() {
        return (
            <View >
                <Text style={styles.formLabel}>{I18n.t('enterSecureId')}</Text>
                <Form style={styles.form}>
                    <Item style={styles.inputContainer}>
                        <Input style={styles.inputField} placeholderTextColor={ColorScheme.lighter} placeholder={I18n.t('yourSecureId')} value={this.props.secureId} onChangeText={(text) => this.props.changeValue('secureId', text)}/>
                    </Item>
                </Form>
            </View>
        );
    }
}

export default SecureId;
