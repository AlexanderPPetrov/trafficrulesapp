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
                <Col style={{width:60}}>
                    <View style={this.getNotificationStyle()}>
                        {this.getNotificationIcon()}
                    </View>
                </Col>
                <Col>
                    <Row>
                        <Col size={2}>
                            <Text style={styles.notificationTitle}>{this.props.title}</Text>
                        </Col>
                        <Col size={1}>
                            <Text style={styles.notificationDate}>{this.props.date}</Text>
                        </Col>
                        <Col style={{width:40}}>
                            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:'100%'}} onPress={()=> this.props.onDismiss()}>
                                <Icon name={'ios-close-circle-outline'} style={{color:'gray', fontSize:30}}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        <Text style={styles.notificationMessage}>{this.props.message}</Text>
                    </Row>
                </Col>

            </Grid>

        </Button>
    }
}

export default Notification;
