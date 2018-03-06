import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import CommonPicker from '../../common/picker/picker';
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

import {View} from 'react-native';

import Ui from '../../common/ui';

import Api from "../../../Api";
const Item = Picker.Item;

class PaymentMethod extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: [],
            noPaymentMethods: false
        }
    }

    componentDidMount = () => {
        if(this.props.paymentMethod == '' ){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }

        Api.get({
            url: 'get-member-payment-options',
            data:{
                mode:'deposit'
            },
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) => {
        if(response.paymentMethods.length > 0){
            this.setState({
                paymentMethods: response.paymentMethods
            }, function(){
                if(!this.props.paymentMethod) {
                    this.props.setPayment(response.paymentMethods[0])
                }
            })
        }else{
            this.setState({
                noPaymentMethods: true
            })
        }
    }

    pickChangeHandler = (value) => {
        this.props.setPayment(this.state.paymentMethods.find(method => method._key === value))
    }

    getPicker = () => {

        const listItems = this.state.paymentMethods.map((method, i) =>
            <Item key={i} value={method._key} label={method._caption}></Item>
        );
        return (
            <CommonPicker
                title={I18n.t('selectPaymentMethod')}
                selectedValue={this.props.paymentMethod}
                onValueChange={this.pickChangeHandler}
                listItems={listItems}
            />
        );
    }

    render() {

        return (
            <View >
                <Text style={Ui.stepHeader}>{I18n.t('paymentMethod')}</Text>
                <Text style={Ui.formLabel}>{I18n.t('selectPaymentMethod')}</Text>
                <View >
                    <Form style={Ui.form}>
                        {this.getPicker()}
                    </Form>
                </View>
            </View>
        );
    }
}

export default PaymentMethod;
