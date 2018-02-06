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
            unseenNotifications:Controller.unseenNotifications
        };

        NotificationsButtonInstance = this;
    }

    static addUnseenNotification = () => {
        if(!NotificationsButtonInstance) return;
        NotificationsButtonInstance.addUnseenNotification()
    };

    setNotifications = (count) => {
        this.setState({
            unseenNotifications:count
        })
    };

    addUnseenNotification = () => {
        const unseenNotifications = this.state.unseenNotifications + 1;
        this.setState({
            unseenNotifications
        })
    };

    static clearUnseenNotifications = () => {
        if(!NotificationsButtonInstance) return;
        Controller.unseenNotifications = 0;
        NotificationsButtonInstance.setState({
            unseenNotifications:0
        })
    };

    getNotificationButton = () => {
        return <Button transparent style={styles.notificationButton} onPress={() => Controller.navigateTo('Notifications')}>
            <Ionicons name="md-notifications-outline" style={[styles.toggleNotification]}/>
            {this.getNotificationCount()}
        </Button>
    }

    getNotificationCount = () => {
        if(this.state.unseenNotifications){
            return <Text style={styles.notificationsBadge}>{this.state.unseenNotifications}</Text>
        }
        return <Text style={[styles.notificationsBadge, styles.notificationsBadgeInactive]}>{this.state.unseenNotifications}</Text>
    };

    render() {
        return this.getNotificationButton()
    }
}

export default NotificationsButton;
