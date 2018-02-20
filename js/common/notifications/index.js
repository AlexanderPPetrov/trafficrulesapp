import React, {Component} from "react";
import {View, Text, TouchableHighlight, Platform} from "react-native";
import {Constants, Permissions, Notifications} from 'expo';
import Api from '../../../Api';
import Controller from '../../../Controller';
import styles from "./styles";
import NotificationMessage from "./notification";
import NotificationsList from "../../screens/notifications/index";
import NotificationsButton from "./notificationsbutton";
import GestureView from './GestureView';
import * as Animatable from 'react-native-animatable';

import ColorScheme from "../colorscheme";

const notificationScreens = ['Transactions', 'Brokerage', 'WeeklyStatus'];

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

let notificationsInstance = null;

class NotificationsHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderNotificationsContainer: false,
            notifications: [],
            receivedNotification: null,
            lastNotificationId: null,
        };
        notificationsInstance = this;

    }

    static startListen = () => {
        if(notificationsInstance){
            notificationsInstance.registerForPushNotificationsAsync()
            notificationsInstance.setState({
                renderNotificationsContainer:true
            })
        }
    };

    componentWillMount() {
        Notifications.addListener((receivedNotification) => {

            if (receivedNotification.origin == 'selected') {

                // Check if application was closed
                if (!Api.auth) {
                    //Save notification data for further navigate
                    //TODO add types handling with real data from push notifications
                    Controller.redirectScreen = 'Transactions';
                    Controller.notificationData = receivedNotification.data;
                    console.log(Controller.redirectScreen )
                    return;
                }

                if (receivedNotification) {
                    console.log(receivedNotification)
                    Controller.navigateTo('Transactions')
                }

            }

            if(Controller.currentRoute === 'Notifications'){
                Controller.unreadNotifications.push(receivedNotification)
                NotificationsList.getUnreadNotifications()

            }else{
                this.state.notifications.push(receivedNotification);

                this.setState({
                    receivedNotification,
                    lastNotificationId: receivedNotification.notificationId,
                    notifications: this.state.notifications
                });
            }


            console.log(receivedNotification.notificationId)
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

    dismissNotification = (fadeOutEffect, notificationId, delay = 300, callback) => {
        if(!this.refs['notification' + notificationId]) return;
        this.refs['notification' + notificationId][fadeOutEffect](delay)
        setTimeout(() => {

            let remainingNotifications = this.state.notifications.filter((notification) => {
                if (notification.notificationId !== notificationId) return notification;
            });

            this.setState({
                notifications: remainingNotifications,
            }, () => {
                if(callback) callback()
            });
        }, delay + 150);
    };

    onDismiss = (notification) => {
        this.dismissNotification('fadeOut', notification.notificationId, 100)
    }

    handlePressedNotification = (notificationId) => {
        this.dismissNotification('fadeOut', notificationId, 100, () => {
            Controller.navigateTo('Transactions')
        })
    };


    getNotification = (notification, i) => {
        // Auto dismiss on 5 seconds
        setTimeout(() => {
            this.dismissNotification('fadeOut', notification.notificationId);
            Controller.unreadNotifications.push(notification);
            NotificationsButton.addUnseenNotification();
        }, 5000);

        const notificationId = notification.notificationId;
        return <Animatable.View key={notificationId} ref={"notification" + notificationId} style={[styles.container,this.getNotificationStyle(i)]} >
            <GestureView style={{alignSelf:'stretch'}}
                content={ <NotificationMessage title={notification.data.title} message={notification.data.body} onDismiss={() => this.onDismiss(notification, i)}  onPress={() => this.handlePressedNotification(notificationId)} />}
                onSwipeRight={(distance, angle) => this.dismissNotification('fadeOutRight', notificationId)}
                onSwipeLeft={(distance, angle) => this.dismissNotification('fadeOutLeft', notificationId)}
                onSwipeUp={(distance, angle) => console.log('asd')}
                onSwipeDown={(distance, angle) => console.log('asd')}
                onUnhanledSwipe={(distance, angle) => console.log('asd')} />

        </Animatable.View>
    };

    getNotificationStyle(i) {
        let offsetTop = Platform.OS === "ios" ? 64 : 56;
        offsetTop = offsetTop + Constants.statusBarHeight + 15;
        return {
            top: offsetTop + i*75
        };
    }
    getNotifications = () => {
        if(!this.state.renderNotificationsContainer){
            return null
        }
        const notificationList = this.state.notifications.map((notification, i) => {
            return this.getNotification(notification, i);
        });

        return notificationList
    };

    render() {
        return this.getNotifications()

    }
}

export default NotificationsHandler;
