import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import es6promise from 'es6-promise';
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
    Text
} from "native-base";

import styles from "./styles";
import Api from "../../../Api";

let loginData = {
    username: 'test9070',
    password: 'test9070'
};

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    error = (response) => {
        console.log(response)
    };
    login = () => {
        let loginData = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(loginData)
        Api.req('login', loginData, this.loginSuccess, this.loginError)
    };

    loginError = (response) => {
        console.log(response)
    };

    loginSuccess = (response) => {
        this.props.navigation.navigate("MyAccount")
    };
    render() {
        return (
            <View>
                <Form>
                    <Item style={styles.inputContainer}>
                        <Input placeholder={I18n.t('username')} onChangeText = {(newValue) => this.setState({username:newValue})}/>
                    </Item>
                    <Item style={styles.inputContainer}>
                        <Input secureTextEntry={true} placeholder={I18n.t('password')} onChangeText = {(newValue) => this.setState({password:newValue})}/>
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
