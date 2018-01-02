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

class PaymentMethod extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: []
            ,
            selected: undefined,
            noPaymentMethods: false
        }
    }

    componentDidMount = () => {
        Api.get({
            url: 'get-member-payment-options',
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) => {
        if(response.paymentMethods.length > 0){
            this.setState({
                paymentMethods: response.paymentMethods
            }, function(){
                this.props.onValueChange(response.paymentMethods[0]._key)
            })
        }else{
            this.setState({
                noPaymentMethods: true
            })
        }
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
                selectedValue={this.props.paymentMethod}
                onValueChange={this.props.onValueChange}
                note={false}
            >
                {listItems}
            </Picker>

        );
    }


    render() {
        return (

            <View >

                <View style={styles.withdrawHeader} >
                    <Text style={{textAlign:'center'}}>{I18n.t('selectPaymentMethod')}</Text>
                </View>
                <View >
                    <Form style={styles.formContainer}>
                        {this.getPicker()}
                    </Form>
                </View>

            </View>


        );
    }
}

export default PaymentMethod;
