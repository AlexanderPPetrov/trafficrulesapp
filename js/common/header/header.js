import React, {Component} from "react";
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
import {Grid, Row, Col} from "react-native-easy-grid";
import StatusBar from './statusbar'
import NotificationsButton from '../notifications/notificationsbutton';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Controller from '../../../Controller';


class HeaderWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    getLeft = () => {
        if(this.props.onBack){
            return <Button
                transparent
                onPress={() => this.props.onBack()}
            >
                <Icon name="arrow-back"/>
            </Button>
        }

        return <Button
            transparent
            onPress={() => {
                    Controller.navigateTo("DrawerOpen")
                    Controller.updateSideBar(I18n.locale)
                }
            }
        >
            <Icon name="ios-menu"/>
        </Button>
    }

    getRight = () => {
        if(this.props.cancel === false){
            return null;
        }
        if(this.props.onBack && !this.props.notifications){
        return <Button transparent small onPress={() => Controller.navigateTo("MyAccount")}>
                <MaterialCommunityIcons name="close" style={{fontSize: 22, textAlign: 'right', color:'#fff'}}/>
            </Button>
        }
        return <NotificationsButton/>
    }

    render() {
        return (
                <Header hasTabs={this.props.hasTabs}>
                    <StatusBar/>
                    <Left>
                        {this.getLeft()}
                    </Left>
                    <Body style={{flex:3}}>
                    <Title style={{paddingLeft:15}}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        {this.getRight()}
                    </Right>
                </Header>

        );
    }
}

export default HeaderWrapper;
