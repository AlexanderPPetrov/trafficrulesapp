import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View, Dimensions, TouchableOpacity, Alert} from "react-native";
import ColorScheme from "../../common/colorscheme";
import Expo, { Constants } from 'expo';
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
import Ui from '../../common/ui';
import Api from '../../../Api';
const keyBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'delete'];

class Pin extends React.Component {

    constructor(props) {
        super(props)
        let {width, height} = Dimensions.get('window')

        let scale = (width - 200) / 500;

        this.state = {
            pinValues: ['-', '-', '-', '-'],
            pin: '',
            pinEntered: false,
            confirmPin: '',
            currentIndex: 0,
            visible: false,
            scale,
            compatible: false,
            fingerprints: false,
            result: ''
        }
    }

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

    logOut = () => {
        Controller.navigateTo("Landing")
    }

    enterValue = (keyValue) => {

        if(keyValue === 'back') {
            console.log('back')
            if(!this.state.pinEntered){
                Api.post({
                    url: 'logout',
                    success: this.logOut,
                    data:{
                        logout:true
                    }
                })
            }else{
                this.setState({
                    pinValues: ['-', '-', '-', '-'],
                    pin: '',
                    pinEntered: false,
                    confirmPin: '',
                    currentIndex: 0
                })
            }

            return
        }

        let value = keyValue,
            index = this.state.currentIndex;

        if (keyValue === 'delete') {
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

                    if(!this.state.pinEntered){
                        this.setState({
                            pinEntered: true,
                            pin:pinEntered,
                            pinValues: ['-', '-', '-', '-'],
                            currentIndex: 0
                        })
                        return;
                    }else{

                        if (pinEntered === this.state.pin) {
                            this.setPin()
                        } else {
                            setTimeout(() => {
                                this.setState({
                                    pinValues: ['-', '-', '-', '-'],
                                    currentIndex: 0,
                                    pin:'',
                                    pinEntered: false
                                })
                            }, 300);
                            Toast.show({
                                text: I18n.t('pinNotMatching'),
                                buttonText: I18n.t('ok'),
                                duration:4000

                            })
                            return;
                        }
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
        if(keyValue === 'delete' || keyValue === 'back'){
            keyStyle = [Ui.pinKey, Ui.pinKeyAction]
        }
        let fontSize = 26;
        let label = keyValue;
        if(keyValue === 'back'){
            fontSize = 16
            label = I18n.t('back')
        }

        if (keyValue === 'delete') {
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

    setPin = () => {

        Expo.SecureStore.setItemAsync('pin', this.state.pin)
            .then(() => {
                this.checkDeviceForHardware()

            })
            .catch((error) => {
                Controller.navigateTo("MyAccount")
            })

    }

    checkDeviceForHardware = async () => {
        let compatible = await Expo.Fingerprint.hasHardwareAsync();
        this.setState({compatible})

        if(compatible){
                Alert.alert(
                    I18n.t('confirm'),
                    I18n.t('fingerPrintPrompt'),
                    [
                        {text:I18n.t('cancel'), onPress:()=> Controller.navigateTo("MyAccount")},
                        {text:I18n.t('ok'), onPress:() => this.enableFingerPrint()}
                    ]
                )
        }else{
            Controller.navigateTo("MyAccount")
        }

    }

    enableFingerPrint = async () => {
        try {
            await Expo.SecureStore.setItemAsync('fingerPrint', 'true')
            Controller.navigateTo("MyAccount")
        } catch (error) {
            Controller.navigateTo("MyAccount")
        }
    }

    getMessages = () => {
        if(!this.state.pinEntered){
            return <View style={[Ui.welcomeContainer, Ui.centered]}>
                <Text style={Ui.welcomeBackMessage}>{I18n.t('enterPin')}</Text>
                <Text style={[Ui.pinPromptText, {textAlign:'center'}]}>{I18n.t('setPinFirstHint')}</Text>
            </View>
        }
        return <View style={[Ui.welcomeContainer, Ui.centered]}>
            <Text style={Ui.welcomeBackMessage}>{I18n.t('confirmPin')}</Text>
            <Text style={[Ui.pinPromptText, {textAlign:'center'}]}>{I18n.t('setPinSecondHint')}</Text>
        </View>

    }

    render() {
        return (
            <View style={{alignItems:'center'}}>
                <View style={Ui.pinView}>
                    {this.getMessages()}
                    {this.getPinBoxList()}
                </View>
                {this.getKeyboard()}
            </View>
        );
    }
}

export default Pin;
