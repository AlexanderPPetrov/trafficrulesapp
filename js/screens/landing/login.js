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

class Login extends React.Component {

    render() {
        return (
            <View style={styles.formContainer}>

                <View>
                    <Form>
                        <Item style={[styles.inputContainer, styles.inputMargin]}>
                            <Icon active name='ios-person-outline' style={[styles.inputIcon, styles.inputIconUser]}/>
                            <Input placeholderTextColor={ColorScheme.lighter} style={styles.inputField}
                                   placeholder={I18n.t('username')} value={this.props.username}
                                   onChangeText={(newValue) => this.props.setValue('username', newValue)}/>
                        </Item>
                        <Item style={styles.inputContainer}>
                            <Icon active name='ios-lock-outline' style={styles.inputIcon}/>
                            <Input placeholderTextColor={ColorScheme.lighter} style={styles.inputField} secureTextEntry={true}
                                   placeholder={I18n.t('password')} value={this.props.password}
                                   onChangeText={(newValue) => this.props.setValue('password', newValue)}/>
                        </Item>
                    </Form>
                    <Button block style={styles.loginButton} onPress={() =>
                        {this.props.loginHandler()}
                    }>
                        <Text>{I18n.t('login').toUpperCase()}</Text>
                    </Button>
                </View>

            </View>
        );
    }
}

export default Login;
