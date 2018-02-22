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
import Ui from '../../common/ui'
import styles from "./styles";

class Login extends React.Component {


    focusPassword = () => {
        if(this.passwordInput && this.passwordInput._root){
            this.passwordInput._root.focus()
        }

    }

    render() {
        return (
            <View style={styles.formContainer}>

                    <Form>
                        <Item floatingLabel style={Ui.inputContainer}>
                            {/*<Icon active name='ios-person-outline' style={[styles.inputIcon, styles.inputIconUser]}/>*/}
                            <Label >{I18n.t('username')}</Label>
                            <Input style={styles.inputField}
                                   value={this.props.username}
                                   onChangeText={(newValue) => this.props.setValue('username', newValue)}/>
                        </Item>
                        <Item floatingLabel style={Ui.inputContainer}>
                            {/*<Icon active name='ios-lock-outline' style={styles.inputIcon}/>*/}
                            <Label >{I18n.t('password')}</Label>
                            <Input getRef={(input) => this.passwordInput = input} style={styles.inputField} secureTextEntry={true}
                                   value={this.props.password}
                                   onChangeText={(newValue) => this.props.setValue('password', newValue)}/>
                        </Item>
                    </Form>
                    <Button primary rounded style={styles.loginButton} onPress={() =>
                        {this.props.loginHandler()}
                    }>
                        <Text style={Ui.buttonLabel}>{I18n.t('login').toUpperCase()}</Text>
                    </Button>

            </View>
        );
    }
}

export default Login;
