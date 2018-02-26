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
    Input,
    Body,
} from "native-base";

import {View, ScrollView} from 'react-native';
import ColorScheme from "../../common/colorscheme";
import styles from "./styles";
import Ui from '../../common/ui';

class Notes extends Component {


    componentDidMount = () => {
        this.props.disableButton(false)
    }

    render() {
        return (

            <View >
                <Text style={Ui.stepHeader}>{I18n.t('notes')}</Text>
                <Text style={Ui.formLabel}>{I18n.t('additionalInformation')}</Text>
                <Form style={Ui.form}>
                    <Item style={Ui.inputContainer}>
                    <Input style={Ui.inputField} multiline={true} numberOfLines={2} blurOnSubmit={false}
                           value={this.props.notes} onChangeText={(text) => this.props.onValueChange('notes', text)} />
                    </Item>
                </Form>
            </View>

        );
    }
}

export default Notes;
