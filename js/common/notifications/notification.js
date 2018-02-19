import React, {Component} from "react";
import {View, Modal, ViewPropTypes, Animated, Text, TouchableOpacity} from "react-native";
import styles from "./styles";
import {Constants, } from 'expo';

import {
    Button,
    Icon
} from "native-base";
import Ui from "../ui";
import ColorScheme from "../colorscheme";
import {Grid, Row, Col} from "react-native-easy-grid";

class Notification extends Component {

    getNotificationIcon = () => {

        return <Icon name={'ios-card'} size={26} style={{color:'#fff'}}/>
    }
    getNotificationStyle = () => {
        return [Ui.iconContainer, styles.notificationIconContainer, styles.withdrawAccepted]
    }


    render() {
        return <Button transparent style={styles.notification} onPress={() => this.props.onPress()}>
            <Grid>
                <Row>
                    <Col style={{width:60}}>
                        <View style={this.getNotificationStyle()}>
                            {this.getNotificationIcon()}
                        </View>
                    </Col>
                    <Col>
                        <Text style={styles.notificationTitle}>{this.props.title}</Text>
                        <Text style={styles.notificationMessage}>{this.props.message}</Text>
                    </Col>
                    <Col style={{width:40}}>
                        <TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:'100%'}} onPress={()=> this.props.onDismiss()}>
                            <Icon name={'ios-close-circle-outline'} style={{color:'gray', fontSize:30}}/>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>

        </Button>
    }
}

export default Notification;
