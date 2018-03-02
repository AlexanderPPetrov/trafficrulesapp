import React, {Component} from "react";

import {View, Dimensions, WebView, Modal, TouchableOpacity} from 'react-native';
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
import ColorScheme from '../../common/colorscheme';
import ChatModal from './chatmodal'
import Ui, {normalize} from '../ui'
import Api from '../../../Api'
import {Grid, Row, Col} from "react-native-easy-grid";
import {SimpleLineIcons, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

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
        console.log('static hide')
        if(chatInstance) chatInstance.showChat(false)
    };

    showChat = (chatVisible) => {
        console.log('showChat', chatVisible)
        this.setState({
            chatVisible
        })
    };

    openChat = () => {
        ChatModal.show()
    }

    render() {
        if(!this.state.chatVisible) return null;

        // return <Draggable reverse={false} renderComponent={
        //             <View style={[Ui.chatButton, Ui.dropShadow]}>
        //                 <Icon name='ios-chatbubbles' size={45} style={Ui.chatButtonIcon} />
        //                 {/*<Text style={{backgroundColor:'transparent'}}>{I18n.t('contactOperators')}</Text>*/}
        //             </View>
        //         } offsetX={deviceWidth/2 - 35} offsetY={deviceHeight - 200} renderSize={40} renderText='B' pressDrag={()=>this.openChat()}/>


        return <View style={[Ui.addContainer, {paddingTop:15, paddingBottom:20}]}>
                <TouchableOpacity
                    onPress={() => {
                        this.openChat()

                    }}>
                    <Icon name="ios-chatbubbles" size={normalize(22)}  style={[Ui.addAccountIcon, {color: ColorScheme.darkest}]}/>
                    <Text style={Ui.addMoreLabel}>{I18n.t('contactOperators')}</Text>
                </TouchableOpacity>
            </View>

    }



}

export default Chat;
