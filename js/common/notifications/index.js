import React, {Component} from "react";
import {View, ActivityIndicator, Text} from "react-native";
import { Constants, Permissions, Notifications } from 'expo';
import Api from '../../../Api';

import ColorScheme from "../colorscheme";


let notificationsInstance = null;

class NotificationsHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            receivedNotification: null,
            lastNotificationId: null,
        };
        notificationsInstance = this;
    }

    static startListen = () => {
        notificationsInstance.registerForPushNotificationsAsync()
    }

    componentWillMount() {
        Notifications.addListener((receivedNotification) => {

            if(receivedNotification.origin == 'selected'){
                if(receivedNotification.data.type === 0){
                    Api.navigateTo('Transactions')
                }
                if(receivedNotification.data.type === 1){
                    Api.navigateTo('Brokerage', {settledBets: true})
                }
            }
            this.setState({
                receivedNotification,
                lastNotificationId: receivedNotification.notificationId,
            });
        });
    }


    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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

    //
    // static setNotifications = (notifications) => {
    //     notificationsInstance.showLoader()
    // };
    //
    // static hide = () => {
    //     loaderInstance.hideLoader()
    // };

    getNotifications = () => {

    };

    render() {
        return <View pointerEvents="none" style={{
            position: 'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            elevation: 9,
            zIndex:999,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {this.getNotifications()}
        </View>
    }
}

export default NotificationsHandler;
