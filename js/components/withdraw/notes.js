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

class Notes extends Component {


    componentDidMount = () => {
        this.props.disableButton(false)
    }

    render() {
        return (

            <View >
                <Text style={styles.formLabel}>{I18n.t('notes')}</Text>
                <Form style={styles.formContainer}>
                    <Item style={styles.inputContainer}>
                    <Input style={styles.inputField} placeholderTextColor={ColorScheme.lighter} multiline={true} numberOfLines={4} blurOnSubmit={false} placeholder={I18n.t('notes')}
                           textAlignVertical="top"
                           value={this.props.notes} onChangeText={(text) => this.props.onValueChange('notes', text)} />
                    </Item>
                </Form>
            </View>

        );
    }
}

export default Notes;
