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

import {Grid, Row, Col} from "react-native-easy-grid";

import styles from "./styles";

class Amount extends Component {

    componentDidMount = () => {
        if (this.props.amount == '') {
            this.props.disableButton(true)
        }
    }

    render() {
        return (

            <View>
                <Text style={styles.formLabel}>{I18n.t('amount')}</Text>
                <Form style={styles.formContainer}>
                    <Item style={styles.inputContainer}>
                        <Input style={styles.inputField} placeholder="0" value={this.props.amount}
                               placeholderTextColor={ColorScheme.lighter}
                               onChangeText={(text) => this.props.onValueChange('amount', text)}
                               keyboardType='numeric'/>
                        <Text>EUR</Text>
                    </Item>
                </Form>

            </View>

        );
    }
}

export default Amount;
