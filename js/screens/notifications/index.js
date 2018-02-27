import React, {Component} from "react";
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
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import Expo from "expo";
import Header from '../../common/header/header';

import {ScrollView, TouchableOpacity, View} from "react-native"
import Ui from '../../common/ui';
import NotificationMessage from '../../common/notifications/notification';
import Controller from '../../../Controller';

let NotificationsList = null;

class Notifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications:[]
        }
        NotificationsList = this;
    }

    componentDidMount = () => {
        this.getUnreadNotifications()
    };


    static getUnreadNotifications = () => {
        if(NotificationsList) NotificationsList.getUnreadNotifications()
    }

    getUnreadNotifications = () => {
        this.setState({
            notifications:Controller.unreadNotifications
        })
    }

    handlePressedNotification = (notification, i) => {
        this.onDismiss(notification, i);
        Controller.navigateTo('Transactions')
    }

    getClearButton = () => {
        if(this.state.notifications.length === 0){
            return null;
        }
        return <View style={Ui.listItem}>
                <Grid>
                    <Col size={2}>
                        {/*<Text style={[Ui.itemLabel, Ui.itemLabelDark]}>{I18n.t('totalProfit')}</Text>*/}
                    </Col>
                    <Col>
                        <TouchableOpacity style={{alignSelf:'flex-end', flexDirection:'column', paddingRight:20}} transparent onPress={()=> this.clearAllNotifications()}>
                            <Text>{I18n.t('clearAll')}</Text>
                            <Icon style={{position:'absolute', right:0}} name="ios-close-circle" />
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </View>



    }

    onDismiss = (notification, i) => {
        this.state.notifications.splice(i, 1);
        this.setState({
            notifications: this.state.notifications
        })
    }

    getNotifications = () => {
        if(this.state.notifications.length === 0){
            return <Text style={Ui.noResults}>{I18n.t('noNotifications')}</Text>
        }
        const notificationList = this.state.notifications.map((notification, i) => {
            return <NotificationMessage key={i} title={notification.data.title} message={notification.data.body} onDismiss={() => this.onDismiss(notification, i)} onPress={() => this.handlePressedNotification(notification, i)} />
        });

        return notificationList
    };

    clearAllNotifications = () => {
        Controller.unreadNotifications = [];
        this.setState({
            notifications:Controller.unreadNotifications
        });
        Expo.Notifications.dismissAllNotificationsAsync()
    };

    goBackward = () => {
        Controller.goBack()
    }

    render() {
        return (
            <Container style={Ui.container}>
                    <Header
                    title={I18n.t('notifications')}
                    onBack={this.goBackward}
                    notifications={true}
                />
                <ScrollView>
                    {this.getClearButton()}
                    {this.getNotifications()}
                </ScrollView>

            </Container>
        );
    }
}

export default Notifications;
