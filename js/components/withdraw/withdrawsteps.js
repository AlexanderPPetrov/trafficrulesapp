import React, {Component} from 'react';
import {Animated, Easing, View, Text} from 'react-native';
import styles from "./styles";
// Import the transition library
import * as Animatable from 'react-native-animatable';
import Api from "../../../Api";

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
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
} from "native-base";

import PaymentMethod from './paymentmethod'
import Account from "./account"
import Amount from './amount'
import Notes from './notes'
import Confirmation from './confirmation'


// Just helper method to get one of the random colors

// Create Transition component using FlipX transition

class WithdrawSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethod: '',
            account:'',
            amount:'0',
            minAmount:0,
            maxAmount:0,
            notes: '',

        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }

    setPayment = (paymentMethod) => {
        this.setState({
            paymentMethod: paymentMethod._key,
            maxAmount: paymentMethod._max_amount,
            minAmount: paymentMethod._min_amount
        }, function(){
            if(Number.parseFloat(this.state.amount) < Number.parseFloat(this.state.minAmount)) {
                this.setState({
                    amount: this.state.minAmount
                })
            }

        });

        this.props.disableButton(false)
    }

    changeValue = (key, value) => {

        if(key == 'amount'){
            value = value.replace(/[^0-9.]/g, '')
            if(Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }
        this.setState({
            [key]: value
        });

        if(value != ''){
            this.props.disableButton(false)
        }else{
            this.props.disableButton(true)
        }
    }

    withdrawMoney = () => {
        Api.post({
            url:'withdraw',
            data: {
                payment_method: this.state.paymentMethod,
                account: this.state.account,
                amount: this.state.amount,
                notes: this.state.notes
            },
            success: this.withdrawSuccess
        })
    }

    withdrawSuccess = () => {
        this.props.onUpdatePage(5)
        this.refs.view.fadeInRight(300);
    }

    renderStep = () => {

        if (this.props.currentPage == 0) {
            return <PaymentMethod setPayment={this.setPayment} disableButton={this.props.disableButton} paymentMethod={this.state.paymentMethod}></PaymentMethod>
        }
        if (this.props.currentPage == 1) {
            return <Account onValueChange={this.changeValue} disableButton={this.props.disableButton} account={this.state.account}></Account>
        }
        if (this.props.currentPage == 2) {
            return <Amount onValueChange={this.changeValue} disableButton={this.props.disableButton} minAmount={this.state.minAmount} maxAmount={this.state.maxAmount} amount={this.state.amount}></Amount>
        }
        if (this.props.currentPage == 3) {
            return <Notes onValueChange={this.changeValue} disableButton={this.props.disableButton} notes={this.state.notes}></Notes>
        }
        if (this.props.currentPage == 4) {
        }
        if (this.props.currentPage == 5) {
            return <Confirmation></Confirmation>
        }
        return null;
    }

    goForward = () => {
        if(this.props.currentPage == 3){
            this.withdrawMoney()

        }else{
            this.props.onUpdatePage(this.props.currentPage + 1)
            this.refs.view.fadeInRight(300);
        }

    }
    goBackward = () => {
        this.props.onUpdatePage(this.props.currentPage - 1)
        this.refs.view.fadeInLeft(300);
    }
    render() {
        return (
            <View style={styles.stepsContainer}>
                <Animatable.View ref="view">
                    {this.renderStep()}
                </Animatable.View>
            </View>

        );
    }
}
export default WithdrawSteps;