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

import styles from "./styles";
import Api from '../../../Api';
class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'test9070',
            password:'test9070',
            showToast: false
        }
    }


    login = () => {
        let loginData = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(loginData)

        Api.post({
            url:'login',
            data: loginData,
            success: this.loginSuccess
        })

    };

    loginSuccess = (response) => {
        console.log(response)
        this.props.navigation.navigate("MyAccount")
    };
    render() {
        return (
            <View style={styles.formContainer}>
                <Form >
                    <Item style={[styles.inputContainer, styles.inputMargin]} >
                        <Icon active name='ios-person-outline' style={[styles.inputIcon, styles.inputIconUser]} />
                        <Input placeholderTextColor={ColorScheme.lighter} style={styles.inputField} placeholder={I18n.t('username')} value={this.state.username} onChangeText = {(newValue) => this.setState({username:newValue})}/>
                    </Item>
                    <Item style={styles.inputContainer}>
                        <Icon active name='ios-lock-outline' style={styles.inputIcon} />
                        <Input placeholderTextColor={ColorScheme.lighter} style={styles.inputField} secureTextEntry={true} placeholder={I18n.t('password')} value={this.state.password} onChangeText = {(newValue) => this.setState({password:newValue})}/>
                    </Item>
                </Form>
                <Button block style={styles.loginButton} onPress={() =>

                    this.login()
                    // this.props.navigation.navigate("MyAccount")

                }>
                    <Text>{I18n.t('login').toUpperCase()}</Text>
                </Button>
            </View>
        );
    }
}

export default Login;
