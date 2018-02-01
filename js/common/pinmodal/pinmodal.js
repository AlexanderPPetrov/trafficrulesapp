import React, {Component} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import styles from "./styles";
import I18n from '../../../i18n/i18n';

import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Toast
} from "native-base";


const keyBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'reset', '0', 'back'];
let _success = null;
let _reset = null;

class PinModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pinValues: ['-', '-', '-', '-'],
            savedPin: '',
            success: null,
            reset: null,
            currentIndex: 0,
            visible: false
        }
    }

    show = (savedPin, success, reset) => {
        _success = success;
        _reset = reset;
        this.setState({
            savedPin,
            pinValues: ['-', '-', '-', '-'],
            currentIndex: 0,
            visible: true
        })
    };

    hide = () => {
        this.setState({
            visible: false
        })
    };

    getPinBox = (pinValue, i) => {
        if (pinValue === '-') {
            return <View key={i} style={styles.pinBox}/>
        }
        return <View key={i} style={[styles.pinBox, styles.pinBoxFilled]}/>
    };

    getPinBoxList = () => {

        const pinBoxes = this.state.pinValues.map((pinValue, i) => {
            return this.getPinBox(pinValue, i);
        });

        return <View
            style={{
                flex: -1,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
            {pinBoxes}
        </View>
    };

    confirmReset = () => {
        Alert.alert(
            I18n.t('confirm'),
            I18n.t('confirmReset'),
            [
                {text:I18n.t('cancel')},
                {text:I18n.t('ok'), onPress:() => {
                    this.hide();
                    _reset()
                }}
            ]
        )
    }

    enterValue = (keyValue) => {


        if(keyValue === 'reset') {
            this.confirmReset()
            return
        }

        let value = keyValue,
            index = this.state.currentIndex;
        if (keyValue === 'back') {
            value = '-';
            index--;
            if (index === -1) {
                return;
            }
        } else {
            if (this.state.pinValues.indexOf('-') === -1) {
                return;
            }
        }
        this.state.pinValues[index] = value;
        this.setState({
            pinValues: this.state.pinValues
        }, () => {
            if (value === '-') {

            } else {
                if (this.state.pinValues.indexOf('-') === -1) {

                    const pinEntered = this.state.pinValues.join('');
                    if (pinEntered === this.state.savedPin) {
                        _success()
                    } else {
                        console.log('wrong pin')
                        Toast.show({
                            text: I18n.t('wrongPin'),
                            buttonText: I18n.t('ok')
                        })
                    }
                }

                index++
            }
            this.setState({
                currentIndex: index
            })
        })
    };

    getKey = (keyValue, i) => {

        if (keyValue === 'back') {
            return <TouchableOpacity key={i} style={styles.pinKey} onPress={() => this.enterValue(keyValue)}>
                <Icon style={{fontSize: 26}} name='ios-backspace-outline'></Icon>
            </TouchableOpacity>
        }
        return <TouchableOpacity key={i} style={styles.pinKey} onPress={() => this.enterValue(keyValue)}>
            <Text style={{fontSize: 26}}>{keyValue}</Text>
        </TouchableOpacity>

    };

    getKeyboard = () => {
        const keys = keyBoard.map((keyValue, i) => {
            return this.getKey(keyValue, i);
        });

        return (
            <View style={styles.pinKeyboard}>
                {keys}
            </View>
        );
    };

    render() {

        if (!this.state.visible) {
            return null;
        }
        return (
            <View style={styles.container}>
                <View style={styles.pinView}>
                    <Text style={styles.pinPromptText}>Enter PIN</Text>
                    {this.getPinBoxList()}
                </View>
                {this.getKeyboard()}
            </View>
        );
    }
}

export default PinModal
