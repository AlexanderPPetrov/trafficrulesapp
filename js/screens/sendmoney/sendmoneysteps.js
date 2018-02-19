import React, {Component} from 'react';
import {Animated, Easing, View, Text, AsyncStorage} from 'react-native';
import styles from "./styles";
// Import the transition library
import Api from "../../../Api";
import I18n from '../../../i18n/i18n';

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
import _ from 'lodash'
import {Toast} from "native-base";
import Account from './account'
import Verify from './verify'
import SecureId from './secureid'
import Confirmation from './confirmation'
import * as Animatable from 'react-native-animatable';


// Just helper method to get one of the random colors

// Create Transition component using FlipX transition

class SendMoneySteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: '',
            secureId: '',
            amount:'',
            currency:'',
            minAmount: '1',
            notesVisible: false,
            notes: '',
            fee:''
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }


    changeValue = (key, value) => {

        if(key === 'amount'){
            value = value.replace(/[^0-9.]/g, '');
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }

        this.setState({ [key]: value });

        if(key === 'account' || key === 'secureId'){
            if(value !== ''){
                this.props.disableButton(false)
            }else{
                this.props.disableButton(true)
            }
        }

    };

    setFee = (response) => {
        this.setState({
            fee: response._fee
        })
        this.props.setPage(3)
    };

    getFee = () => {
        Api.post({
            url: 'calculate-member-send-money-fee',
            data: {
                email: this.state.account,
                amount: this.state.amount,
                currency: this.state.currency,
                secure_id: this.state.secureId,
            },
            success: this.setFee,
        })
    };

    sendMoney = () => {
        Api.post({
            url: 'send-money',
            data: {
                email: this.state.account,
                amount: this.state.amount,
                currency: this.state.currency,
                secure_id: this.state.secureId,
                notes: this.state.notes,
            },
            success: this.sendMoneySuccess,
        })
    };
    // data.append("email", "vasill.k@delasport.com");
    // data.append("amount", "3");
    // data.append("currency", "EUR");
    // data.append("secure_id", "MklJNjY=");
    // data.append("notes", "test");
    sendMoneySuccess = () => {
        console.log('success')
        this.props.setPage(4)
    }

    renderStep = () => {

        if (this.props.currentPage == 0) {

            return <Account  changeValue={this.changeValue}
                             account={this.state.account}
                             currency={this.state.currency}
                             amount={this.state.amount}
                             disableButton={this.props.disableButton}
                             notesVisible={this.state.notesVisible}
                             notes={this.state.notes}
            ></Account>
        }

        if (this.props.currentPage == 1) {

            return <SecureId  changeValue={this.changeValue}
                              secureId={this.state.secureId}
                              disableButton={this.props.disableButton}
            ></SecureId>

        }
        if (this.props.currentPage == 3) {
            return <Verify    secureId={this.state.secureId}
                              email={this.state.account}
                              amount={this.state.amount}
                              currency={this.state.currency}
                              fee={this.state.fee}


            ></Verify>
        }
        if (this.props.currentPage == 4) {
            return <Confirmation></Confirmation>
        }
        return null;
    }

    goForward = () => {

        if (this.props.currentPage == 1) {
            this.getFee();
            return;
        }
        if (this.props.currentPage == 2) {
            this.sendMoney();
            return;
        }

        this.props.setPage(this.props.currentPage + 1)
        this.refs.view.fadeInRight(300);


    }
    goBackward = () => {
        this.props.setPage(this.props.currentPage - 1)
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

export default SendMoneySteps;