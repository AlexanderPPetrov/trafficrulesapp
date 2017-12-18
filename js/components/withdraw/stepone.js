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

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: []
            ,
            selected: undefined

        }
    }

    componentDidMount = () => {
        // Api.get({
        //     url: 'get-member-payment-options',
        //     success: this.dataLoaded
        // })
    }

    dataLoaded = (response) => {
        this.setState({
            paymentMethods: response.paymentMethods
        })
        console.log(this.state.paymentMethods)
    }
    onValueChange = (value: string) => {
        console.log(value)
        this.setState({
            selected: value
        });
    }


    getPicker = () => {

        let paymentMethods = this.state.paymentMethods;
        const listItems = paymentMethods.map((method, i) =>
            <Item key={i} value={method._key} label={method._caption}></Item>
        );
        return (
            <Picker
                mode="dropdown"
                placeholder="Select One"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange}
                note={false}
            >
                {listItems}
            </Picker>
        );
    }


    render() {
        return (

            <View >

                <CardItem header>
                    <Text>{I18n.t('selectPaymentMethod')}</Text>
                </CardItem>
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <Form style={{borderWidth: 1, borderColor: '#d6d7da'}}>

                        {this.getPicker()}

                    </Form>
                </View>

            </View>


        );
    }
}

export default Withdraw;
