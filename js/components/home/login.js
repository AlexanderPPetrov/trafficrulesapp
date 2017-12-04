import React, { Component } from "react";
import I18n from '../../../i18n/i18n';
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
    StyleProvider,
    Text
} from "native-base";

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import styles from "./styles";

class Login extends React.Component {

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder={I18n.t('username')} style={styles.inputField}/>
                        </Item>
                        <Item last>
                            <Input placeholder={I18n.t('password')} style={styles.inputField} />
                        </Item>
                    </Form>

                    <Button block style={styles.loginButton} onPress={() => this.props.navigation.navigate("MyAccount")}>
                        <Text>{I18n.t('login').toUpperCase()}</Text>
                    </Button>
                </Content>
            </StyleProvider>
        );
    }
}

export default Login;
