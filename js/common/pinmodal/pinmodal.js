import React, {Component} from 'react';
import {View, TouchableOpacity, Alert, Dimensions} from 'react-native';
import I18n from '../../../i18n/i18n';
import Ui from '../../common/ui';
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
    ListItem,
    Toast
} from "native-base";
import * as Animatable from 'react-native-animatable';
import Logo from '../../common/logo/logo';
import ColorScheme from '../../common/colorscheme';
import style from "./styles";

const keyBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'reset', '0', 'back'];
let _success = null;
let _reset = null;

class PinModal extends Component {

    constructor(props) {
        super(props)
        let {width, height} = Dimensions.get('window')

        let scale = (width - 120) / 500;

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
        if(!this.refs.pinModal) return
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
        if(!this.refs.pinModal) return
        this.refs.pinModal.fadeOutDown(500)
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 500)
    };

    getPinBox = (pinValue, i) => {
        if (pinValue === '-') {
            return <View key={i} style={Ui.pinBox}/>
        }
        return <View key={i} style={[Ui.pinBox, Ui.pinBoxFilled]}/>
    };

    getPinBoxList = () => {

        const pinBoxes = this.state.pinValues.map((pinValue, i) => {
            return this.getPinBox(pinValue, i);
        });

        return <View
            style={Ui.pinBoxContainer}>
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
                            duration:4000
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

        let keyStyle = Ui.pinKey
        if(keyValue === 'back' || keyValue === 'reset'){
            keyStyle = [Ui.pinKey, Ui.pinKeyAction]
        }
        let fontSize = 26;
        let label = keyValue;
        if(keyValue === 'reset'){
            fontSize = 16
            label = I18n.t('resetPin')
        }

        if (keyValue === 'back') {
            return <TouchableOpacity key={i} style={keyStyle} onPress={() => this.enterValue(keyValue)}>
                <Icon style={{fontSize, color:ColorScheme.darkest}} name='ios-backspace'></Icon>
            </TouchableOpacity>
        }
        return <TouchableOpacity key={i} style={keyStyle} onPress={() => this.enterValue(keyValue)}>
            <Text style={{fontSize, color:ColorScheme.darkest}}>{label}</Text>
        </TouchableOpacity>

    };

    getKeyboard = () => {
        const keys = keyBoard.map((keyValue, i) => {
            return this.getKey(keyValue, i);
        });

        return (
            <View style={Ui.pinKeyboard}>
                {keys}
            </View>
        );
    };

    render() {

        if (!this.state.visible) {
            return null;
        }
        return (

            <Animatable.View ref="pinModal" style={style.container} >
                <StatusBar />

                <View style={Ui.pinView}>
                    <View style={Ui.welcomeContainer}>
                        <Logo scale={this.state.scale} primary={ColorScheme.logoPrimary} secondary={ColorScheme.logoSecondary} slogan={ColorScheme.neutralLight} />
                        <Text style={Ui.pinPromptText}>{I18n .t('enterPinMessage')}</Text>
                    </View>

                    {this.getPinBoxList()}
                </View>
                {this.getKeyboard()}
            </Animatable.View>
        );
    }
}

export default PinModal
