import React, {Component} from "react";

import {View, Dimensions, WebView, Modal} from 'react-native';
import AppLink  from './AppLink';
import I18n from '../../../i18n/i18n';
import {
    Container,
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
import Header from '../../common/header/header';
import ChatModal from './chatmodal'
import Ui from '../ui'
import Api from '../../../Api'
import {Grid, Row, Col} from "react-native-easy-grid";

const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');

let chatInstance = null;
class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatVisible: true,
            modalVisible: false
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
        ChatModal.show()
    }

    render() {
        if(!this.state.chatVisible) return null;

        return <Draggable reverse={false} renderComponent={
                    <View style={Ui.chatButton}>
                        <Icon name='ios-chatbubbles' size={45} style={Ui.chatButtonIcon} />
                        {/*<Text style={{backgroundColor:'transparent'}}>{I18n.t('contactOperators')}</Text>*/}
                    </View>
                } offsetX={deviceWidth - 120} offsetY={deviceHeight - 220} renderSize={40} renderText='B' pressDrag={()=>this.openChat()}/>
    }
}

export default Chat;
