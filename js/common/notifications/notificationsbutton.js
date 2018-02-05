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

        let unreadNotificationsCount = 0
        if(Controller.unreadNotifications){
            unreadNotificationsCount = Controller.unreadNotifications.length
        }
        this.state = {
            unreadNotificationsCount
        };

        NotificationsButtonInstance = this;
    }

    static addNotification = () => {
        if(!NotificationsButtonInstance) return;
        NotificationsButtonInstance.addNotification()
    };

    setNotifications = (count) => {
        this.setState({
            unreadNotifications:count
        })
    };

    addNotification = () => {
        const unreadNotifications = this.state.unreadNotificationsCount + 1;
        this.setState({
            unreadNotificationsCount:unreadNotifications
        })
    };

    static clearNotifications = () => {
        if(!NotificationsButtonInstance) return;
        NotificationsButtonInstance.setState({
            unreadNotificationsCount:0
        })
    };

    getNotificationButton = () => {
        let pointerEvents = 'none';
        if(this.state.unreadNotificationsCount){
            pointerEvents = 'auto';
        }
        return <Button transparent style={styles.notificationButton} pointerEvents={pointerEvents} onPress={() => Controller.navigateTo('Notifications')}>
            <Ionicons name="md-notifications-outline" style={[styles.toggleNotification]}/>
            {this.getNotificationCount()}
        </Button>
    }

    getNotificationCount = () => {
        if(this.state.unreadNotificationsCount){
            return <Text style={styles.notificationsBadge}>{this.state.unreadNotificationsCount}</Text>
        }
        return <Text style={[styles.notificationsBadge, styles.notificationsBadgeInactive]}>{this.state.unreadNotificationsCount}</Text>
    };

    render() {
        return this.getNotificationButton()
    }
}

export default NotificationsButton;
