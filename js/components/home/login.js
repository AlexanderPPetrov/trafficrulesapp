import React, { Component } from "react";
import I18n from '../../../i18n/i18n';
import { View } from "react-native";
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

class Login extends React.Component {

    render() {
        return (
                <View>
                    <Form >
                        <Item style={styles.inputField}>
                            <Input placeholder={I18n.t('username')} />
                        </Item>
                        <Item style={styles.inputField}>
                            <Input placeholder={I18n.t('password')} />
                        </Item>
                    </Form>

                    <Button block style={styles.loginButton} onPress={() => this.props.navigation.navigate("MyAccount")}>
                        <Text>{I18n.t('login').toUpperCase()}</Text>
                    </Button>
                </View>
        );
    }
}

export default Login;
