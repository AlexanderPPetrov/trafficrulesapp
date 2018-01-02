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
            currentPage: 0,
            paymentMethod: '',
            account:'',
            amount:'',
            notes: '',

        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }

    changeHandler = (page) => {
        this.setState({
            page:page
        })
        //this.props.onUpdatePage(page);
    }

    setPaymentMethod = (value: string) => {
        this.setState({
            paymentMethod: value
        });
        this.checkValue(value);
    }


    setAccount = (value: string) => {
        this.setState({
            account: value
        });
        this.checkValue(value);
    }

    setAmount = (value: string) => {
        this.setState({
            amount: value
        });
        this.checkValue(value);
    }

    setNotes = (value: string) => {
        this.setState({
            notes: value
        });
        this.checkValue(value);
    }

    checkValue = (value) => {
        if(value != ''){
            this.props.disableButton(false)
        }else{
            this.props.disableButton(true)
        }
    }

    //TODO refactor setting state
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
       console.log('success')
        this.setState({
            currentPage: 5
        })
    }

    renderStep = () => {

        if (this.state.currentPage == 0) {
            return <PaymentMethod onValueChange={this.setPaymentMethod} paymentMethod={this.state.paymentMethod}></PaymentMethod>
        }
        if (this.state.currentPage == 1) {
            return <Account onValueChange={this.setAccount} account={this.state.account}></Account>
        }
        if (this.state.currentPage == 2) {
            return <Amount onValueChange={this.setAmount} amount={this.state.amount}></Amount>
        }
        if (this.state.currentPage == 3) {
            return <Notes onValueChange={this.setNotes} notes={this.state.notes}></Notes>
        }
        if (this.state.currentPage == 4) {
            this.withdrawMoney()
        }
        if (this.state.currentPage == 5) {
            return <Confirmation></Confirmation>
        }
        return <View></View>


    }

    goForward = () => {
        this.setState({currentPage: this.state.currentPage + 1})
        this.refs.view.fadeInRight(300);
    }
    goBackward = () => {
        this.setState({currentPage: this.state.currentPage - 1})
        this.refs.view.fadeInLeft(300);
    }
    render() {
        // Render an initial state

        //onRef={ref => (this.tabs = ref)} {...this.props}
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