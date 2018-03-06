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

    render() {
        return (

            <View>
                <Text style={Ui.formLabel}>{this.props.label}</Text>
                <Grid>
                    <Row style={Ui.inputContainer}>
                        <Col>
                            <Form style={Ui.form}>
                                <Item style={{borderBottomWidth:0, marginLeft: 0}}>

                                    <Input ref="amountInput"  style={[Ui.inputField, Ui.amountInput]} value={this.props.amount}
                                           onChangeText={(text) => this.props.onValueChange('amount', text)}
                                           keyboardType='numeric'/>
                                </Item>
                            </Form>
                        </Col>
                        <Col style={{width:50}}>
                            <Text style={Ui.amountCurrency}>{this.state.currency}</Text>
                        </Col>
                    </Row>

                </Grid>


            </View>

        );
    }
}

export default Amount;
