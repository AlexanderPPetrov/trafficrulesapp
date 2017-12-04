import React, { Component } from "react";

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

import I18n from '/i18n/i18n';
import styles from "./styles";

class Login extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>{I18n.t('username')}</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>{I18n.t('password')}</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button block style={{ margin: 15, marginTop: 50 }}>
                        <Text>{I18n.t('login').toUpperCase()}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default Login;
