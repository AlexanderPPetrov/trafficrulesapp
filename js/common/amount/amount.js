import React, {Component} from "react";
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
import {View, Platform} from 'react-native';
import ColorScheme from "../../common/colorscheme";
import Ui from '../../common/ui';

import {Grid, Row, Col} from "react-native-easy-grid";
import Api from "../../../Api";


class Amount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currency:Api.accountSettings._currency
        }
    }

    componentDidMount = () => {
        if(this.props.amount == ''){
            this.focus()
        }
    }

    focus = () => {
        if(this.refs.amountInput){
            this.refs.amountInput._root.focus()
        }
    }

    getCurrencyContainerStyle = () => {
        let style = {width:115,paddingLeft: 15, paddingRight:50}
        return style
    }
    render() {
        return (

            <View>
                <Text style={Ui.formLabel}>{this.props.label}</Text>
                <Grid>
                    <Row>
                        <Col>
                            <Form style={Ui.form}>
                                <Item style={Ui.inputContainer}>
                                    <Input ref="amountInput"  style={[Ui.inputField, Ui.amountInput]} value={this.props.amount}
                                           onChangeText={(text) => this.props.onValueChange('amount', text)}
                                           keyboardType='numeric'/>
                                </Item>
                            </Form>
                        </Col>
                        <Col style={this.getCurrencyContainerStyle()}>
                            <Text style={Ui.amountCurrency}>{this.state.currency}</Text>
                        </Col>
                    </Row>

                </Grid>


            </View>

        );
    }
}

export default Amount;
