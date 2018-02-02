import React, {Component} from "react";
import {View, Modal, ViewPropTypes, Animated, Text} from "react-native";
import styles from "./styles";
import {Constants} from 'expo';

import ColorScheme from "../colorscheme";

class NotificationsHandler extends Component {



    render() {
        return <View >
            <View style={styles.notification}>
                <Text style={styles.notificationTitle}>{this.props.title}</Text>
                <Text style={styles.notificationMessage}>{this.props.message}</Text>
            </View>
        </View>
    }
}

export default NotificationsHandler;
