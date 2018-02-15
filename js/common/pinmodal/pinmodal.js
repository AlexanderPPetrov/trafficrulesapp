import React, {Component} from 'react';
import {View, TouchableOpacity, Alert, Dimensions} from 'react-native';
import styles from "./styles";
import I18n from '../../../i18n/i18n';
import StatusBar from "../header/statusbar"
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
import * as Animatable from 'react-native-animatable';
import Logo from '../../common/logo/logo';

const keyBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'reset', '0', 'back'];
let _success = null;
let _reset = null;

class PinModal extends Component {

    constructor(props) {
        super(props)
        let {width, height} = Dimensions.get('window')

        let scale = (width - 200) / 500;

        this.state = {
            pinValues: ['-', '-', '-', '-'],
            savedPin: '',
            success: null,
            reset: null,
            currentIndex: 0,
            visible: false,
            scale
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
        }, () => {
            this.refs.pinModal.slideInUp(500)
        })

    };

    hide = () => {
        this.refs.pinModal.fadeOutDown(500)
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 500)
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
            style={styles.pinBoxContainer}>
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
                        setTimeout(() => {
                            this.setState({
                                pinValues: ['-', '-', '-', '-'],
                                currentIndex: 0
                            })
                        }, 300);
                        Toast.show({
                            text: I18n.t('wrongPin'),
                            buttonText: I18n.t('ok'),

                        })
                        return;
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

        let keyStyle = styles.pinKey
        if(keyValue === 'back' || keyValue === 'reset'){
            keyStyle = [styles.pinKey, styles.pinKeyAction]
        }
        let fontSize = 26;
        let label = keyValue;
        if(keyValue === 'reset'){
            fontSize = 16
            label = I18n.t('resetPin')
        }

        if (keyValue === 'back') {
            return <TouchableOpacity key={i} style={keyStyle} onPress={() => this.enterValue(keyValue)}>
                <Icon style={{fontSize}} name='ios-backspace'></Icon>
            </TouchableOpacity>
        }
        return <TouchableOpacity key={i} style={keyStyle} onPress={() => this.enterValue(keyValue)}>
            <Text style={{fontSize}}>{label}</Text>
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

            <Animatable.View ref="pinModal" style={styles.container} >
                <StatusBar/>

                <View style={styles.pinView}>
                    <View style={styles.welcomeContainer}>
                        <Logo scale={this.state.scale} arrowOnly={true}/>
                        <Text style={styles.welcomeBackMessage}>{I18n.t('welcomeBack')}</Text>
                        <Text style={styles.pinPromptText}>{I18n.t('enterPinMessage')}</Text>
                    </View>

                    {this.getPinBoxList()}
                </View>
                {this.getKeyboard()}
            </Animatable.View>
        );
    }
}

export default PinModal
