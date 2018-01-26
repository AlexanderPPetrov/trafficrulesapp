import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Form,
    Picker,
    Item,
    Text,
    H3,
    Button,
    Icon,
    Input,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
} from "native-base";

import {View, ScrollView} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import ColorScheme from "../../common/colorscheme";

import styles from "./styles";
import Api from "../../../Api";


class Confirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fee:''
        }
    }

    componentDidMount() {
        // todo get fee?
    }


    render() {
        return (

            <View>
                <Text style={styles.formLabel}>{I18n.t('confirmSendMoney')}</Text>
                <View>
                    <Grid>
                        <Row>
                            <Col>
                                <Text>{I18n.t('recipient')}</Text>
                            </Col>
                            <Col>
                                <Text>{this.props.email}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>{I18n.t('amount')}</Text>
                            </Col>
                            <Col>
                                <Text>{this.props.amount} {this.props.currency}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>{I18n.t('fee')}</Text>
                            </Col>
                            <Col>
                                <Text>{this.state.fee} {this.props.currency}</Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </View>

        );
    }
}

export default Confirmation;
