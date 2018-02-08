import React, { Component } from "react";
import { ScrollView , View, Dimensions } from "react-native";
import Expo from "expo";
import NotificationsHandler from "../../common/notifications/index";
import {Toast} from "native-base";

import I18n from '../../../i18n/i18n';
import Logo from '../../common/logo/logo';
import ColorScheme from "../../common/colorscheme";
import StatusBar from "../../common/header/statusbar";

import { Container, Button, H3, Header, Title, Body, Left, Right, Text } from "native-base";
import Login from "./login";
import SetPin from "./setpin";
import styles from "./styles";
import Api from '../../../Api';
import Controller from '../../../Controller';



class Landing extends Component {

    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window')
        let scale = (width - 80) / 500;
        this.state = {
            username: '',
            password: '',
            pin:'',
            pinEntered: '',
            setPin:false,
            scale:scale,
            width:width,
            height:height

        }
    }

    componentDidMount = () => {
        this.readSecureItem('username')
        this.readSecureItem('password')
        this.readSecureItem('pin')
    };

    readSecureItem = (key) => {
        Expo.SecureStore.getItemAsync(key)
            .then((value) => {
                this.setState({
                    [key]:value
                }, () => {
                    if(key === 'pin' && value){
                        Controller.showPinModal(this.state.pin, this.loginHandler, this.resetPin);
                    }
                })

            })
            .catch((error) => {
                this.errorMessage(error)
            })

    };

    resetPin = () => {
        this.setState({
            password:''
        })
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
        this.login()
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

    setValue = (key, value) => {
    	this.setState({
			[key]: value
		})
	}

    changeValue = (value) => {
        value = value.replace(/[^0-9]/g, '');

        this.setState({
            pinEntered: value
        })

        if(this.state.pin === value){
            this.login()
        }

    };

    loginSuccess = (response) => {

        NotificationsHandler.startListen();
        if (this.state.pin) {

            if(Controller.redirectScreen){
                Controller.navigateTo(Controller.redirectScreen, Controller.notificationData)
            }else{
                Controller.navigateTo("MyAccount")
            }
            setTimeout(()=> {
                Controller.hidePinModal();
            }, 300)

        } else {
            Expo.SecureStore.setItemAsync('username', this.state.username)
                .then(() => Expo.SecureStore.setItemAsync('password', this.state.password)
                    .then(() => this.setState({
                        setPin:true

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

	getLandingScreen = () => {
		if(this.state.pin === '') {
		    console.log(this.state.pin, '1')
			return null;
		}

		if(this.state.setPin) {
            console.log(this.state.pin, '2')

            return <ScrollView contentContainerStyle={styles.loginContainer}>
                <SetPin navigation={this.props.navigation} >
                </SetPin>
            </ScrollView >
        }
        console.log(this.state.pin, '3')


        return <ScrollView contentContainerStyle={styles.loginContainer}>
			<View style={styles.imageContainer}>
				<Logo scale={this.state.scale} primary={ColorScheme.logoPrimary} secondary={ColorScheme.logoSecondary} slogan={ColorScheme.logoSlogan}></Logo>
				{/*<View>*/}
				{/*<MaterialCommunityIcons name="account-box" size={100} style={styles.avatar}></MaterialCommunityIcons>*/}
				{/*<Text style={styles.helloMessage}>Hello John!</Text>*/}
				{/*</View>*/}
			</View>
			<Login navigation={this.props.navigation} username={this.state.username} password={this.state.password} setValue={this.setValue} loginHandler={this.loginHandler}></Login>
		</ScrollView >
	}

	render() {

		return <Container>
            <StatusBar/>
			{this.getLandingScreen()}
		</Container>
	}
}


export default Landing;
