import React, {Component} from "react";

import {View, Dimensions, Linking} from 'react-native';
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

const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');



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
    componentWillMount = () => {
        chatInstance = this;
    }
    componentWillUnmount = () => {
        chatInstance = null;
    }

    openChat = () => {
        let skypeURL = 'skype:aleksandar.p@delasport.com?chat&topic=Premium%20Tradings%20Support';
        Linking.openURL(skypeURL).catch(err => {
            console.log('cannot open skype', err)
        });
    }

    render() {
        if(!this.state.chatVisible) return null;

        return <Draggable reverse={false} renderComponent={
                    <View style={Ui.chatButton}>
                        <Icon name='ios-chatbubbles' style={{backgroundColor:'transparent'}} />
                        <Text style={{backgroundColor:'transparent'}}>{I18n.t('contactOperators')}</Text>
                    </View>
                } offsetX={deviceWidth - 150} offsetY={deviceHeight - 150} renderSize={40} renderText='B' pressDrag={()=>this.openChat()}/>
    }
}

export default Chat;
