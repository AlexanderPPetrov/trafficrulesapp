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
                placeholder=""
                iosHeader=" "
                selectedValue={this.props.paymentMethod}
                onValueChange={(value) =>
                    this.props.setPayment(this.state.paymentMethods.find(method => method._key === value))
                }
                renderHeader={backAction =>
                    <Header style={{ backgroundColor: "#f44242" }}>
                        <Left>
                            <Button transparent onPress={backAction}>
                                <Icon name="arrow-back"  />
                            </Button>
                        </Left>
                        <Body style={{ flex: 3 }}>
                        <Title style={{ color: "#fff" }}></Title>
                        </Body>
                        <Right />
                    </Header>}
                note={false}
            >
                {listItems}
            </Picker>

        );
    }

    render() {


        return (
            <View >
                <Text style={styles.stepHeader}>{I18n.t('paymentMethod')}</Text>
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

export default PaymentMethod;
