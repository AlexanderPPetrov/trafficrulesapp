import React, {Component} from "react";
import {View, Text, TouchableHighlight, Platform} from "react-native";
import {Constants, Permissions, Notifications} from 'expo';
import Api from '../../../Api';
import Controller from '../../../Controller';
import styles from "./styles";
import Notification from "./notification";
import GestureView from './GestureView';
import * as Animatable from 'react-native-animatable';

import ColorScheme from "../colorscheme";

const notificationScreens = ['Transactions', 'Brokerage', 'WeeklyStatus'];

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

let counter = 0;

let notificationsInstance = null;

class NotificationsHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderNotificationsContainer: false,
            notifications: [
                {
                    remote: true,
                    origin: "received",
                    data: {type: 0, id:0}
                },
                {
                    remote: true,
                    origin: "received",
                    data: {type: 0,  id:1}
                },
                {
                    remote: true,
                    origin: "received",
                    data: {type: 0,  id:2}
                },
                {
                    remote: true,
                    origin: "received",
                    data: {type: 0,  id:3}
                }],
            receivedNotification: null,
            lastNotificationId: null,
        };
        notificationsInstance = this;
    }

    static startListen = () => {
        notificationsInstance.registerForPushNotificationsAsync()
        notificationsInstance.setState({
            renderNotificationsContainer:true
        })
    };

    componentWillMount() {
        Notifications.addListener((receivedNotification) => {

            if (receivedNotification.origin == 'selected') {

                // Check if application was closed
                if (!Api.auth) {
                    //Save notification data for further navigate
                    Controller.redirectScreen = notificationScreens[receivedNotification.data.type];
                    Controller.notificationData = receivedNotification.data;
                    return;
                }

                if (receivedNotification.data.type === 0) {
                    Controller.navigateTo('Transactions')
                }
                if (receivedNotification.data.type === 1) {
                    Controller.navigateTo('Brokerage', {settledBets: true})
                }
            }

            this.state.notifications.push(receivedNotification);
            this.setState({
                receivedNotification,
                lastNotificationId: receivedNotification.notificationId,
                notifications: this.state.notifications
            });
        });
    }

    registerForPushNotificationsAsync = async () => {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token)

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        // return fetch(PUSH_ENDPOINT, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         token: {
        //             value: token,
        //         },
        //         user: {
        //             username: 'Brent',
        //         },
        //     }),
        // });
    };


    onPressDismissAllNotifications = () => {
        Notifications.dismissAllNotificationsAsync();
        this.setState({
            lastNotificationId: null,
        });
    };

    onPressDismissOneNotification = () => {
        Notifications.dismissNotificationAsync(this.state.lastNotificationId);
        this.setState({
            lastNotificationId: null,
        });
    };


    getNotification = (notification, i) => {

        return <Animatable.View key={counter} ref={"notification" + i} style={[styles.container,this.getNotificationStyle(i)]} >
            <GestureView style={{alignSelf:'stretch'}}
                content={ <Notification title={i} message={counter} />}
                onSwipeRight={(distance, angle) => console.log('asd')}
                onSwipeLeft={(distance, angle) => {
                    this.refs['notification' + i].fadeOutLeft(150)
                    setTimeout(() => {
                        this.state.notifications.splice(i,1);
                        this.setState({
                            notifications: this.state.notifications,
                        });
                   }, 300);
                }}
                onSwipeUp={(distance, angle) => console.log('asd')}
                onSwipeDown={(distance, angle) => console.log('asd')}
                onUnhanledSwipe={(distance, angle) => console.log('asd')} />

        </Animatable.View>
    }

    getNotificationStyle(i) {
        let offsetTop = Platform.OS === "ios" ? 64 : 56;
        offsetTop = offsetTop + Constants.statusBarHeight + 15;
        return {
            top: offsetTop + i*70
        };
    }
    getNotifications = () => {
        if(!this.state.renderNotificationsContainer){
            return null
        }
        const notificationList = this.state.notifications.map((notification, i) => {
            counter++
            return this.getNotification(notification, i);
        });

        return notificationList
    };

    render() {
        return this.getNotifications()

    }
}

export default NotificationsHandler;
