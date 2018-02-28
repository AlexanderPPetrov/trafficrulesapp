import React, {Component} from "react";
import {View, Modal, ViewPropTypes, Animated, Text, TouchableOpacity} from "react-native";
import styles from "./styles";
import ColorScheme from '../colorscheme';

import {
    Button,
    Icon
} from "native-base";
import Ui, {normalize} from "../ui";
import Api from "../../../Api";
import I18n from "../../../i18n/i18n";
import moment from 'moment/min/moment-with-locales'
import {Grid, Row, Col} from "react-native-easy-grid";
const types = {
    deposit:{
        name: 'ios-card',
        backgroundColor: ColorScheme.notificationDeposit
    },
    withdraw: {
        name: 'ios-cash',
        backgroundColor: ColorScheme.notificationWithdraw
    },
    weekly_status: {
        name: 'ios-stats',
        backgroundColor: ColorScheme.notificationWeeklyStatus
    },
    funds_transfer: {
        name: 'ios-swap',
        backgroundColor: ColorScheme.notificationFundsTransfer
    },
    brokerage_activity: {
        name: 'ios-briefcase',
        backgroundColor: ColorScheme.notificationBrokerageActivity
    },
    bop_activity: {
        name: 'ios-briefcase',
        backgroundColor: ColorScheme.notificationBopActivity
    },
    betting_tips: {
        name: 'ios-bulb',
        backgroundColor: ColorScheme.notificationBopActivity
    },
    ad_hoc: {
        name:''
    }
}

moment.fn.fromNowOrNow = function (a) {
    if (Math.abs(moment().diff(this)) < 25000) { // 1000 milliseconds
        return I18n.t('just_now');
    }
    return this.fromNow(a);
}

class Notification extends Component {

    constructor(props){
        super(props)
        this.state = {
            date:''
        }
    }
    componentDidMount = async () => {

        if(this.props.data && this.props.data.data.length > 0){

            console.log(this.props.data.data)
            console.log('Decrypted data: ', Api.decrypt(this.props.data.data))
        }
        moment.locale(I18n.locale)



        if(this.props.data.received_date){
            this.setState({
                date:moment(this.props.data.received_date).fromNowOrNow()
            })
        }
    }

    getNotificationIcon = () => {

        return <Icon name={types[this.props.data.type].name} size={26} style={{color:'#fff'}}/>
    }
    getNotificationStyle = () => {
        return [Ui.iconContainer, {backgroundColor:types[this.props.data.type].backgroundColor}]
    }

    render() {
        return <Button  style={[styles.notification, this.props.paddingStyle]} onPress={() => this.props.onPress()}>
            <Grid>
                <Col style={{width:60}}>
                    <View style={this.getNotificationStyle()}>
                        {this.getNotificationIcon()}
                    </View>
                </Col>
                <Col>
                    <Row>
                        <Col size={2}>
                            <Text style={[Ui.itemLabelDark, {fontSize:normalize(15)}]}>{this.props.data.title}</Text>
                        </Col>
                        <Col size={1}>
                            <Text style={[Ui.itemLabelLight, Ui.labelSmallest, {textAlign:'right'}]}>{this.state.date}</Text>
                        </Col>
                        {/*<Col style={{width:40}}>*/}
                            {/*<TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:'100%'}} onPress={()=> this.props.onDismiss()}>*/}
                                {/*<Icon name={'ios-close-circle-outline'} style={{color:'gray', fontSize:30}}/>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</Col>*/}
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.notificationMessage}>{this.props.data.message}</Text>
                            <View style={styles.unreadIndicator}></View>
                        </Col>
                    </Row>
                </Col>

            </Grid>

        </Button>
    }
}

export default Notification;
