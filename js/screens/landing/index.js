import React, {Component} from "react";
import {ScrollView, View, Dimensions, Alert, Image, KeyboardAvoidingView} from "react-native";
import NotificationsHandler from "../../common/notifications/index";
import {Toast} from "native-base";
import Expo, {Notifications} from 'expo';
import I18n from '../../../i18n/i18n';
import Logo from '../../common/logo/logo';
import ColorScheme from "../../common/colorscheme";
import StatusBar from "../../common/header/statusbar";

import {Container, Button, H3, Header, Title, Body, Left, Right, Text} from "native-base";
import Login from "./login";
import SetPin from "./setpin";
import styles from "./styles";
import Api from '../../../Api';
import Controller from '../../../Controller';
import {AsyncStorage} from "react-native";

let locale = 'en';

class Landing extends Component {

    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window')
        let scale = (width - 80) / 500;
        this.state = {
            username: '',
            password: '',
            pin: '',
            pinEntered: '',
            setPin: false,
            fingerPrint: false,
            scale,
            width,
            height

        }
    }


    getAvailableLocales = async () => {
        try {
            let response = await fetch(
                'https://api.premiumtradings.com/translations/available_locales.json'
            );
            let responseJson = await response.json();
            I18n.availableLocales = responseJson;
        } catch (error) {
            console.log('unable to get available locales')
        }
    };

    getLocale = async () => {
        try {
            locale = await AsyncStorage.getItem('locale');
            if (!locale) {
                locale = 'en';
                await this.detectLocale()
            }else{
                await this.loadTranslations()
            }
        } catch (error) {
            console.log(error)
        }
    };

    loadTranslations = async () => {

        try {
            let response = await fetch(
                'https://api.premiumtradings.com/translations/locales/' + locale + '.json'
            );
            let responseJson = await response.json();
            I18n.translations[locale] = responseJson;
            I18n.locale = locale;

        } catch (error) {
            I18n.locale = 'back';
            console.log(error)
        }
    };

    detectLocale = async () => {
        try {
            let localeString = await Expo.Util.getCurrentLocaleAsync();
            const language = localeString.split('_')[0].split('-')[0];
            if (language != 'en' && I18n.availableLocales[language]) {
                await this.showChangeLocaleConfirm(localeString, language)
            }else{
                await this.loadTranslations()
            }
        } catch (error){
            console.log('Could not read device locale')
        }
    };

    showChangeLocaleConfirm = (localeString, language) => {
        Alert.alert(
            I18n.t('confirm'),
            I18n.t('confirmLocaleQuestion') + localeString,
            [
                {text: I18n.t('cancel'), onPress: ()=> this.setLocale('en', false)},
                {text: I18n.t('ok'), onPress: () => this.setLocale(language, true)},
            ],
            { onDismiss: () => this.setLocale('en', false) }
        )
    };

    setLocale = async (language, localeChanged) => {
        locale = language;
        AsyncStorage.setItem('locale', language, () => {
            Api.setLocale = localeChanged
        });
        await this.loadTranslations()
    };

    componentDidMount = async () => {
        await this.getAvailableLocales()
        await this.getLocale();
        await this.setDeviceToken();
        await this.readSecureItem('username');
        await this.readSecureItem('password');
        let fingerPrint = await this.readSecureItem('fingerPrint');
        if(!fingerPrint || fingerPrint === 'false'){
            let pin = await this.readSecureItem('pin')
            if(pin){
                Controller.showPinModal(pin, this.loginHandler, this.resetPin);
            }

        }else{
            Controller.showPinModal(false, this.loginHandler, this.resetPin);
        }
    };

    setDeviceToken = async () => {
        let token = await Notifications.getExpoPushTokenAsync();
        Api.deviceToken = token;

    };

    readSecureItem = async (key) => {
        let result = null;

        try {
            result = await Expo.SecureStore.getItemAsync(key);
            this.setState({
                [key]: result
            })
        } catch (error) {
            result = false;
        }
        return result

    };

    resetPin = () => {
        this.deleteSecureItem('pin');
        this.deleteSecureItem('fingerPrint');
        this.deleteSecureItem('password');

    };

    deleteSecureItem = (key) => {

        Expo.SecureStore.deleteItemAsync(key)
            .then((value) => {
                this.setState({
                    [key]: value
                }, () => {
                    if(key === 'password'){
                         this.refs.login.focusPassword();
                    }
                })
            })
            .catch((error) => {
                this.errorMessage(error)
            })
    };

    errorMessage = (message) => {
        Toast.show({
            text: message,
            buttonText: I18n.t('ok'),
            duration:4000
        })
    };

    loginHandler = () => {
        this.login()
    };

    login = () => {

        if(!this.state.username || !this.state.password){
            Toast.show({
                text: I18n.t('userPassMandatory'),
                buttonText: I18n.t('ok'),
                duration:4000
            })
            return
        }

        let loginData = {
            username: this.state.username,
            password: this.state.password,
            device_id: Api.deviceToken
        };

        Api.post({
            url: 'login',
            data: loginData,
            success: this.loginSuccess,
            error: this.loginError
        })

    };

    loginError = (message) => {

        if (message === 'wrong_user_name_or_password' || message === 'invalid_or_missing_credetials') {
            // if (this.state.pin) {
            //     this.deleteSecureItem('pin')
            //     this.deleteSecureItem('password')
            // }
        }
        Toast.show({
            text: I18n.t(message),
            buttonText: I18n.t('ok')
        })
    };

    setValue = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    changeValue = (value) => {
        value = value.replace(/[^0-9]/g, '');

        this.setState({
            pinEntered: value
        });

        if (this.state.pin === value) {
            this.login()
        }

    };

    loginSuccess = (response) => {

        NotificationsHandler.startListen();

        if (this.state.pin || this.state.fingerPrint) {
            // Controller.selectedNotification
            if (Controller.selectedNotification) {
                console.log(Controller.selectedNotification)
                Controller.handleNotification(Controller.selectedNotification.data)
            } else {
                Controller.navigateTo("MyAccount")
            }
            setTimeout(() => {
                Controller.hidePinModal();
            }, 500)

        } else {
            Expo.SecureStore.setItemAsync('username', this.state.username)
                .then(() => Expo.SecureStore.setItemAsync('password', this.state.password)
                    .then(() => this.setState({
                        setPin: true

                    }))
                    .catch((error) => {
                        console.log(error)
                    })
                )
                .catch((error) => {
                    console.log(error)
                })
        }

    };

    getImage = () => {
        if (this.state.pin === '' || this.state.setPin)  return null;
        return <Image style={{
            bottom: 0,
            position: "absolute",
            width: this.state.width,
            height: this.state.width*0.27965}}
                      source={require('../../../img/login_background.png')}
        />
    }
    getLandingScreen = () => {
        if (this.state.pin === '') {
            return null;
        }

        if (this.state.setPin) {
            return  <SetPin navigation={this.props.navigation}>
                </SetPin>
        }
        return  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}} >

                <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                    <Logo scale={this.state.scale} primary={ColorScheme.logoPrimary} secondary={ColorScheme.logoSecondary}
                          slogan={ColorScheme.logoSlogan}></Logo>
                    <Login ref="login" navigation={this.props.navigation} username={this.state.username} password={this.state.password}
                           setValue={this.setValue} loginHandler={this.loginHandler}></Login>
                </KeyboardAvoidingView>
            </View>


    }

    getContentContainerStyle = () => {
        let style = {flex:1,alignItems:'center', backgroundColor:'#fff'}
        if (this.state.setPin) {
            style.backgroundColor = ColorScheme.mainBackground
        }
        return style
    }

    render() {

        return <ScrollView contentContainerStyle={this.getContentContainerStyle()} keyboardShouldPersistTaps="never">
            <StatusBar/>
            {this.getLandingScreen()}
            {this.getImage()}
        </ScrollView>
    }
}


export default Landing;
