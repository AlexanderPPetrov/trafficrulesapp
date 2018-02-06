import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import _ from "lodash";

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
import Expo from "expo";

import {ScrollView} from "react-native"
import Api from "../../../Api";
import Ui from '../../common/ui';
import NotificationMessage from '../../common/notifications/notification';
import NotificationsButton from '../../common/notifications/notificationsbutton';
import styles from "./styles";
import Controller from '../../../Controller';


class Notifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications:[]
        }
    }

    componentDidMount = () => {
        NotificationsButton.clearUnseenNotifications();
        this.setState({
            notifications:Controller.unreadNotifications
        })
    };

    handlePressedNotification = () => {
        console.log('lalala')
    }

    getClearButton = () => {
        if(this.state.notifications.length === 0){
            return null;
        }
        return <Button onPress={()=> this.clearAllNotifications()}>
            <Text>{I18n.t('clearAll')}</Text>
        </Button>
    }

    getNotifications = () => {
        if(this.state.notifications.length === 0){
            return <Text>{I18n.t('noNotifications')}</Text>
        }
        const notificationList = this.state.notifications.map((notification, i) => {
            return <NotificationMessage key={i} title={i} message={i} onPress={() => this.handlePressedNotification(notification, i)} />
        });

        return notificationList
    };

    clearAllNotifications = () => {
        Expo.Notifications.dismissAllNotificationsAsync()
    };

    render() {
        return (
            <Container style={Ui.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => Controller.navigateTo("DrawerOpen")}
                        >
                            <Icon name="ios-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('notifications')}</Title>
                    </Body>
                    <Right>
                        <NotificationsButton/>
                    </Right>

                </Header>
                {this.getClearButton()}
                <ScrollView>
                    {this.getNotifications()}
                </ScrollView>

            </Container>
        );
    }
}

export default Notifications;
