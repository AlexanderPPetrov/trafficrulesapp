import React, {Component} from "react";

import {View} from 'react-native';
import I18n from '../../../i18n/i18n';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Card,
    Body,
    CardItem
} from "native-base";

import {Ionicons} from '@expo/vector-icons';

import {Grid, Row, Col} from "react-native-easy-grid";
import styles from "./styles";


class Chat extends Component {

    render() {
        return (
            <Button style={styles.chatButton} iconLeft transparent primary block onPress={() => console.log('chat pat')}>
                <Icon name='ios-chatbubbles' />
                <Text>{I18n.t('contactOperators')}</Text>
            </Button>
        );
    }
}

export default Chat;
