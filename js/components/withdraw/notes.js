import React, {Component} from "react";
import {TextInput } from 'react-native';
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
    Input,
    Body,
} from "native-base";

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class Notes extends Component {



    render() {
        return (

            <View >

                <View style={styles.withdrawHeader} >
                    <Text style={{textAlign:'center'}}>{I18n.t('notes')}</Text>
                </View>
                <Form style={styles.formContainer}>
                    <Input multiline={true}
                               numberOfLines={4}
                               blurOnSubmit={false} placeholder={I18n.t('notes')} value={this.props.notes} onChangeText={this.props.onValueChange} />
                </Form>
            </View>

        );
    }
}

export default Notes;
