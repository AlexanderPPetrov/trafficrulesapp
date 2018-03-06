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
import Ui from '../ui'
import Api from '../../../Api'
import {Grid, Row, Col} from "react-native-easy-grid";

const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');

let chatInstance = null;
// const jsForInjection = `
//   var el = document.getElementsByTagName('body')[0];
//   el.style.height = '${Dimensions.get('window').height}px';
// `
class ChatModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    showChat = (modalVisible) => {
        this.setState({
            modalVisible
        })
    };

    closeModal = () => {
        this.showChat(false)
    }

    render() {
        if(!this.state.modalVisible) return null;

        return <View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.showChat(false)}
                >
                    <Header
                        onBack={this.closeModal}
                        title={I18n.t('contactUs')}
                        cancel={false}
                    />
                    <WebView
                        style={{
                            width: deviceWidth,
                            height:deviceHeight
                        }}
                        source={{uri: 'https://www.premiumtradings.com/chat.html'}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        ignoreSslError={true}
                        startInLoadingState={true}
                        // injectedJavaScript={jsForInjection}
                        // onNavigationStateChange={()=> console.log('chat ')}
                    >
                    </WebView>
                </Modal>
            </View>

    }
}

export default ChatModal;
