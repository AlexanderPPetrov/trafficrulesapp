import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {ScrollView } from "react-native";
import ColorScheme from "../../common/colorscheme";
import Expo from "expo";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Text,
    Toast
} from "native-base";
import Controller from '../../../Controller';

import styles from "./styles";

class Pin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pin: '',
            confirmPin: '',
            buttonDisabled: true
        }
    }

    changeValue = (key, value) => {

        value = value.replace(/[^0-9]/g, '');

        this.setState({[key]: value}, () => {
            if (this.state.pin == this.state.confirmPin && this.state.pin.length == 4) {
                this.setState({
                    buttonDisabled: false
                })
            } else {
                this.setState({
                    buttonDisabled: true
                })
            }
        })

    };

    setPin = () => {

        Expo.SecureStore.setItemAsync('pin', this.state.pin)
            .then(() => Controller.navigateTo("MyAccount"))
            .catch((error) => {
                console.log(error, 'pin not saved');
                Controller.navigateTo("MyAccount")
            })

    }


    render() {
        return (
            <ScrollView  contentContainerStyle={styles.formContainer}>
                <Text style={styles.pinLabel}>{I18n.t('setPinTitle')}</Text>
                <Text>{I18n.t('setPinHint')}</Text>
                <Form>
                    <Text>{I18n.t('enterPin')}</Text>
                    <Item style={[styles.inputContainer, styles.inputMargin]}>
                        <Input keyboardType='numeric' placeholderTextColor={ColorScheme.lighter}
                               style={styles.inputField} placeholder="****" value={this.state.username}
                               maxLength={4}
                               secureTextEntry={true}
                               onChangeText={(newValue) => this.changeValue('pin', newValue)}/>
                    </Item>
                    <Text>{I18n.t('confirmPin')}</Text>
                    <Item style={[styles.inputContainer, styles.inputMargin]}>
                        <Input keyboardType='numeric' placeholderTextColor={ColorScheme.lighter}
                               style={styles.inputField} placeholder="****" value={this.state.username}
                               maxLength={4}
                               secureTextEntry={true}
                               onChangeText={(newValue) => this.changeValue('confirmPin', newValue)}/>
                    </Item>
                </Form>
                <Button block style={styles.loginButton} disabled={this.state.buttonDisabled} onPress={() =>

                    this.setPin()

                }>
                    <Text>{I18n.t('setPin').toUpperCase()}</Text>
                </Button>
            </ScrollView>
        );
    }
}

export default Pin;
