import React, {Component} from "react";
import {View, TouchableHighlight, Platform} from "react-native";
import {Constants, Permissions, Notifications} from 'expo';
import Api from '../../../Api';
import Controller from '../../../Controller';
import styles from "./styles";
import Notification from "./notification";
import GestureView from './GestureView';
import * as Animatable from 'react-native-animatable';

import ColorScheme from "../colorscheme";
import {Ionicons} from '@expo/vector-icons';

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

let NotificationsButtonInstance = null;

class NotificationsButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            unreadNotifications:Controller.unreadNotifications.length
        };

        NotificationsButtonInstance = this;
    }

    componentDidMount = () => {
        NotificationsButtonInstance.mounted = true;
    }

    componentWillUnmount = () => {
        NotificationsButtonInstance.mounted = false;
    }

    static  setUnreadNotifications = count => {
        if(!NotificationsButtonInstance || !NotificationsButtonInstance.mounted) return;
        NotificationsButtonInstance.setUnreadNotifications(count)
    };

    setUnreadNotifications = count => {
        this.setState({
            unreadNotifications:count
        })
    };

    goToNotifications = () => {
        if(Controller.currentRoute !== 'Notifications'){
            Controller.navigateTo('Notifications')
        }
    }

    getNotificationButton = () => {
        let buttonDisabled = true;
        let iconStyle = [styles.toggleNotification]
        if(this.state.unreadNotifications){
            buttonDisabled = false
            iconStyle = [styles.toggleNotification, {opacity:1}]
        }
        return <Button transparent disabled={buttonDisabled} style={styles.notificationButton} onPress={() => this.goToNotifications()}>
            <Ionicons name="md-notifications-outline" style={iconStyle}/>
            {this.getNotificationCount()}
        </Button>
    }

    getNotificationCount = () => {
        if(this.state.unreadNotifications){
            return <View style={styles.notificationsBadge}/>
        }
        return <View style={[styles.notificationsBadge, styles.notificationsBadgeInactive]}/>
    };

    render() {
        return this.getNotificationButton()
    }
}

export default NotificationsButton;
