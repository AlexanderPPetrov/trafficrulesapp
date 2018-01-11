import React, {Component} from "react";
import I18n from '../../../i18n/i18n';

import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Form,
    Picker,
    Item as FormItem,
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
import {View, ScrollView } from 'react-native';

import styles from "./styles";

class Confirmation extends Component {

    getConfirmationPage = () => {
        if(this.props.depositCompleted == 'success'){
            return <View >
                <View style={[styles.withdrawHeader, styles.centered]} >
                    <Icon active name='ios-checkmark-circle' style={styles.successIcon}/>
                    <Text style={{textAlign:'center', fontSize:20}}>{I18n.t('depositConfirmation')}</Text>
                </View>
                <Grid>
                    <Row>
                        <Col>
                            <Text>{I18n.t('amount')}</Text>
                        </Col>
                        <Col>
                            <Text>{I18n.t('fee')}</Text>
                        </Col>
                        <Col>
                            <Text>{I18n.t('netAmount')}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text>{this.props._payload._amount} {this.props._payload._currency}</Text>
                        </Col>
                        <Col>
                            <Text>{this.props._payload._fee} {this.props._payload._currency}</Text>
                        </Col>
                        <Col>
                            <Text>{this.props._payload._net_amount} {this.props._payload._currency}</Text>
                        </Col>
                    </Row>
                </Grid>

                <Text style={styles.confirmationText}>
                    {I18n.t('depositSuccess')}
                </Text>
                <Text style={styles.confirmationText}>
                    {I18n.t('depositSuccessTwo')}
                </Text>
            </View>
        }
        if(this.props.depositCompleted == 'error'){
            return <View >
                <View style={[styles.withdrawHeader, styles.centered]} >
                    <Icon active name='ios-close-circle' style={styles.errorIcon}/>
                    <Text style={{textAlign:'center', fontSize:20}}>{I18n.t('depositError')}</Text>
                </View>

                <Text style={styles.confirmationText}>
                    {I18n.t('depositErrorMessage')}
                </Text>

            </View>
        }

        return null
    }

    render() {
        return (

            this.getConfirmationPage()

        );
    }
}

export default Confirmation;
