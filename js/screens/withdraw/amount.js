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
    Item,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Input
} from "native-base";

import {View, ScrollView, AsyncStorage} from 'react-native';
import ColorScheme from "../../common/colorscheme";

import {Grid, Row, Col} from "react-native-easy-grid";

import styles from "./styles";
import Ui from '../../common/ui';

class Amount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: ''
        }
    }
    componentDidMount = () => {
        if (this.props.amount == '') {
            this.props.disableButton(true)
        }

        AsyncStorage.getItem('accountSettings').then((value) => {
            this.setState({
                currency:JSON.parse(value)._currency
            })
        });
    }

    render() {
        return (

            <View>
                <Text style={Ui.formLabel}>{I18n.t('withdrawAmount')}</Text>
                <Grid>
                    <Row>
                        <Col>
                            <Form style={Ui.form}>
                                <Item style={Ui.inputContainer}>
                                    <Input style={[Ui.inputField, Ui.amountInput]} placeholder="0" value={this.props.amount}
                                           placeholderTextColor={ColorScheme.lighter}
                                           onChangeText={(text) => this.props.onValueChange('amount', text)}
                                           keyboardType='numeric'/>
                                </Item>
                            </Form>
                        </Col>
                        <Col style={{width:60}}>
                            <Text style={Ui.amountCurrency}>{this.state.currency}</Text>
                        </Col>
                    </Row>

                </Grid>


            </View>

        );
    }
}

export default Amount;
