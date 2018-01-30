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

import DepositMethod from './depositmethod'
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
            account: '',
            amount: '0',
            minAmount: 0,
            maxAmount: 0,
            notes: '',
            secureId:'',
            _payload:{}

        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    setPayment = (paymentMethod) => {
        console.log('#######',paymentMethod)
        this.setState({
            paymentMethod: paymentMethod._key,
            maxAmount: paymentMethod._max_amount,
            minAmount: paymentMethod._min_amount
        }, function () {
            if (Number.parseFloat(this.state.amount) < Number.parseFloat(this.state.minAmount)) {
                this.setState({
                    amount: this.state.minAmount
                })
            }

        });

        if(paymentMethod._key == 'ECOPAYZ'){
            this.props.setPages(3)
        }else{
            this.props.setPages(4)
        }

        this.props.disableButton(false)
    }

    changeValue = (key, value) => {

        if (key == 'amount') {
            value = value.replace(/[^0-9.]/g, '')
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }

        if (key == 'secureId') {
            value = value.replace(/[^0-9]/g, '')
        }

        this.setState({
            [key]: value
        }, ()=> this.checkButton(key, value));

    }



    checkButton = (key, value) => {

        if(key == 'account'){
            if(value == '' || (this.state.secureId == '' && this.state.paymentMethod == 'NT')){
                this.props.disableButton(true)
            }else{
                this.props.disableButton(false)
            }
            return;
        }

        if(key == 'secureId'){
            if(value != '' && this.state.account != ''){
                this.props.disableButton(false)
            }else{
                this.props.disableButton(true)
            }
            return;
        }

        if (value != '') {
            this.props.disableButton(false)
        } else {
            this.props.disableButton(true)
        }
    }

    depositMoney = () => {
        Api.post({
            url: 'deposit',
            data: {
                payment_method: this.state.paymentMethod,
                account: this.state.account,
                amount: this.state.amount,
                secure_id: this.state.secureId,
                response_url: 'http://api-prmts.dev.cc/v1/payment-response',
                success_url: 'https://mytest2.premiumtradings.com/#success',
                error_url: 'https://mytest2.premiumtradings.com/#error',
                fail_url: 'https://mytest2.premiumtradings.com/#error',
                cancel_url: 'https://mytest2.premiumtradings.com/#cancel'
            },
            success: this.depositSuccess
        })
    }

    depositSuccess = (response) => {
        this.setState({
            _payload: response
        })
            this.props.onUpdatePage(this.props.currentPage + 1)

        this.props.setPaymentData({
            payment_method: this.state.paymentMethod,
            account: this.state.account,
            amount:this.state.amount,
            payment_id: response._payment_num
        });
        if(response._status == 'confirmed'){
            this.props.setDepositCompleted('success')
            this.props.onUpdatePage(this.props.currentPage + 1)
        }
        this.refs.view.fadeInRight(300);
        if(response._redirect_url){
            this.props.setRedirectUrl(response._redirect_url)
        }
    }

    renderStep = () => {

        let currentStep = this.props.stepsNames[this.props.currentPage]
        console.log(currentStep, this.props.currentPage)

        if (currentStep == 'method') {
            return <DepositMethod setPayment={this.setPayment} disableButton={this.props.disableButton}
                                  paymentMethod={this.state.paymentMethod}></DepositMethod>
        }
        if (currentStep == 'account') {
            return <Account onValueChange={this.changeValue} disableButton={this.props.disableButton} paymentMethod={this.state.paymentMethod}
                            account={this.state.account} secureId={this.state.secureId}></Account>
        }
        if (currentStep == 'amount') {
            return <Amount onValueChange={this.changeValue} disableButton={this.props.disableButton}
                           minAmount={this.state.minAmount} maxAmount={this.state.maxAmount}
                           amount={this.state.amount}></Amount>
        }
        if (currentStep == 'process') {

        }

        if (currentStep == 'deposit') {
            return <Confirmation _payload={this.state._payload} depositCompleted={this.props.depositCompleted}></Confirmation>
        }
        return null;
    }

    goForward = () => {
        let currentStep = this.props.stepsNames[this.props.currentPage]
        if (currentStep == 'amount') {
            this.depositMoney()

        } else {
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
            <Animatable.View ref="view">
                {this.renderStep()}
            </Animatable.View>
        );
    }
}

export default WithdrawSteps;