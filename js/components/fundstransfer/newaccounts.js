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

class NewAccounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: [],
            selected: undefined,
            noPaymentMethods: false
        }
    }

    componentDidMount = () => {
        if(this.props.paymentMethod == '' ){
            this.props.disableButton(true)
        }

        Api.get({
            url: 'get-member-payment-options',
            data:{
                method: 'withdrawal'
            },
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) => {
        if(response.paymentMethods.length > 0){
            this.setState({
                paymentMethods: [this.state.paymentMethods, ...response.paymentMethods]
            }, function(){
                this.props.setPayment(response.paymentMethods[0])
            })
        }else{
            this.setState({
                noPaymentMethods: true
            })
        }
    }

    getPicker = () => {

        const listItems = this.state.paymentMethods.map((method, i) =>
            <Item key={i} value={method._key} label={method._caption}></Item>
        );
        return (
            <Picker
                mode="dropdown"
                placeholder={I18n.t('paymentMethod')}
                iosHeader=" "
                selectedValue={this.props.paymentMethod}
                onValueChange={(value) =>
                    this.props.setPayment(this.state.paymentMethods.find(method => method._key === value))
                }
                note={false}
            >
                {listItems}
            </Picker>

        );
    }

    render() {


        return (
            <View >
                <Text style={styles.formLabel}>{I18n.t('selectPaymentMethod')}</Text>
                <View >
                    <Form style={styles.form}>
                        <View style={styles.inputContainer}>
                            {this.getPicker()}
                        </View>
                    </Form>
                </View>
            </View>
        );
    }
}

export default NewAccounts;
