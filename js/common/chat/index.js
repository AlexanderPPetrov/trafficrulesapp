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
    Body,
    CardItem
} from "native-base";
import Draggable from '../../common/draggable/Draggable';

import {Ionicons} from '@expo/vector-icons';
import Ui from '../ui'

import {Grid, Row, Col} from "react-native-easy-grid";
import styles from "./styles";

let chatInstance = null;
class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatVisible: false
        };

        chatInstance = this;
    }

    static show = () => {
        if(chatInstance) chatInstance.showChat(true)
    };

    static hide = () => {
        if(chatInstance) chatInstance.showChat(false)
    };

    showChat = (chatVisible) => {
        this.setState({
            chatVisible
        })
    };

    render() {
        if(!this.state.chatVisible) return null;

        return <Draggable reverse={false} renderComponent={
                    <View style={Ui.chatButton}>
                        <Icon name='ios-chatbubbles' />
                        <Text>{I18n.t('contactOperators')}</Text>
                    </View>
                } x={0} y={0} renderText='B' pressDrag={()=>alert('touched!!')}/>
    }
}

export default Chat;
