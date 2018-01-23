import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import ColorScheme from "../../common/colorscheme";

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

import {Octicons} from '@expo/vector-icons';
import styles from "./styles";
import Api from '../../../Api';

import {AsyncStorage} from "react-native"

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
        console.log(key, value)
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
1
        AsyncStorage.setItem('pin', this.state.pin)
        this.props.navigation.navigate("MyAccount")


    }

    loginSuccess = (response) => {

        this.props.navigation.navigate("MyAccount")
    };

    render() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.pinLabel}>{I18n.t('setPinTitle')}</Text>
                <Text>{I18n.t('setPinHint')}</Text>
                <Form>
                    <Text>{I18n.t('enterPin')}</Text>
                    <Item style={[styles.inputContainer, styles.inputMargin]}>
                        <Input keyboardType='numeric' placeholderTextColor={ColorScheme.lighter}
                               style={styles.inputField} placeholder="****" value={this.state.username}
                               onChangeText={(newValue) => this.changeValue('pin', newValue)}/>
                    </Item>
                    <Text>{I18n.t('confirmPin')}</Text>
                    <Item style={[styles.inputContainer, styles.inputMargin]}>
                        <Input keyboardType='numeric' placeholderTextColor={ColorScheme.lighter}
                               style={styles.inputField} placeholder="****" value={this.state.username}
                               onChangeText={(newValue) => this.changeValue('confirmPin', newValue)}/>
                    </Item>
                </Form>
                <Button block style={styles.loginButton} disabled={this.state.buttonDisabled} onPress={() =>

                    this.setPin()

                }>
                    <Text>{I18n.t('setPin').toUpperCase()}</Text>
                </Button>
            </View>
        );
    }
}

export default Pin;
