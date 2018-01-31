import React, {Component} from "react";
import Expo from "expo";
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

import styles from "./styles";
import Api from '../../../Api';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            pin: '',
            pinEntered: '',
            pinLoaded: false

        }
    }

    componentDidMount = () => {

        // //Workaround for bug in React Native 0.50
        // setTimeout(() => {

            this.readSecureItem('username')
            this.readSecureItem('password')
            this.readSecureItem('pin')


        // }, 50)

    };


    readSecureItem = (key) => {
        Expo.SecureStore.getItemAsync(key)
            .then((value) => {
                this.setState({
                    [key]:value
                })
                if(key === 'pin'){
                    this.setState({
                        pinLoaded:true
                    })
                }
            })
            .catch((error) => {
                this.errorMessage(error)
            })

    };

    resetPin = () => {
        this.deleteSecureItem('pin');
        this.deleteSecureItem('password');
    };

    deleteSecureItem = (key) => {

        Expo.SecureStore.deleteItemAsync(key)
            .then((value) => {
                this.setState({
                    [key]:value
                })
            })
            .catch((error) => {
                this.errorMessage(error)
            })
    };

    errorMessage = (message) => {
        Toast.show({
            text: message,
            buttonText: I18n.t('ok')
        })
    };

    loginHandler = () => {

        // if (this.state.pin) {
        //
        //     if(this.state.pin === this.state.pinEntered){
        //         this.login()
        //     }else{
        //         this.errorMessage(I18n.t('wrongPin'))
        //     }
        //
        // } else {
            this.login()
        // }


    };

    login = () => {

        let loginData = {
            username: this.state.username,
            password: this.state.password,
        };

        Api.post({
            url: 'login',
            data: loginData,
            success: this.loginSuccess,
            error: this.loginError
        })

    };

    loginError = (message) => {

        if(message === 'wrong_user_name_or_password' || message === 'invalid_or_missing_credetials'){
            if(this.state.pin){
                this.deleteSecureItem('pin')
                this.deleteSecureItem('password')
            }
        }
        Toast.show({
            text: I18n.t(message),
            buttonText: I18n.t('ok')
        })
    };

    changeValue = (value) => {
        value = value.replace(/[^0-9]/g, '');

        this.setState({
            pinEntered: value
        })

        if(this.state.pin === value){
            this.login()
        }

    };

    getLoginForm = () => {

        if(!this.state.pinLoaded){
            return null;
        }

        if (this.state.pin) {
            return <Form>
                <View style={{paddingTop:30}}>
                    <Button style={styles.chatButton} iconLeft transparent primary block onPress={() => this.resetPin()}>
                        <Icon name='ios-sync-outline' />
                        <Text>{I18n.t('resetPin')}</Text>
                    </Button>
                </View>
                <Text>{I18n.t('enterPin')}</Text>
                <Item style={[styles.inputContainer, styles.inputMargin]}>
                    <Input keyboardType='numeric' placeholderTextColor={ColorScheme.lighter}
                           style={styles.inputField} placeholder="****" value={this.state.pinEntered} maxLength={4}
                           secureTextEntry={true}
                           onChangeText={(newValue) => this.changeValue(newValue)}/>
                </Item>

            </Form>
        }

        return <View>
            <Form>
                <Item style={[styles.inputContainer, styles.inputMargin]}>
                    <Icon active name='ios-person-outline' style={[styles.inputIcon, styles.inputIconUser]}/>
                    <Input placeholderTextColor={ColorScheme.lighter} style={styles.inputField}
                           placeholder={I18n.t('username')} value={this.state.username}
                           onChangeText={(newValue) => this.setState({username: newValue})}/>
                </Item>
                <Item style={styles.inputContainer}>
                    <Icon active name='ios-lock-outline' style={styles.inputIcon}/>
                    <Input placeholderTextColor={ColorScheme.lighter} style={styles.inputField} secureTextEntry={true}
                           placeholder={I18n.t('password')} value={this.state.password}
                           onChangeText={(newValue) => this.setState({password: newValue})}/>
                </Item>
            </Form>
            <Button block style={styles.loginButton} onPress={() =>

                this.loginHandler()
                // this.props.navigation.navigate("MyAccount")

            }>
                <Text>{I18n.t('login').toUpperCase()}</Text>
            </Button>
        </View>

    };

    loginSuccess = (response) => {

        if (this.state.pin) {
            this.props.navigation.navigate("MyAccount")
        } else {
            Expo.SecureStore.setItemAsync('username', this.state.username)
                .then(() => Expo.SecureStore.setItemAsync('password', this.state.password)
                    .then(() => this.props.navigation.navigate("SetPin"))
                )
                .catch((error) => {
                    console.log(error)
                    this.props.navigation.navigate("SetPin")
                })
        }

    };

    render() {
        return (
            <View style={styles.formContainer}>

                {this.getLoginForm()}

            </View>
        );
    }
}

export default Login;
