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
import Notes from './notes'
import Confirmation from './confirmation'
import * as Animatable from 'react-native-animatable';


// Just helper method to get one of the random colors

// Create Transition component using FlipX transition

class SendMoneySteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: '',
            amount:'',
            currency:'',
            minAmount: '1',
            notes: '',
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


        this.props.disableButton(true)

    };

    sendMoney = () => {
        Api.post({
            url: 'transfer',
            data: {

            },
            success: this.sendMoneySuccess,
        })
    };

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
            ></Account>
        }

        if (this.props.currentPage == 2) {

            return <Notes setNotes={this.setNotes} disableButton={this.props.disableButton}
                          notes={this.state.notes}></Notes>
        }
        if (this.props.currentPage == 3) {
            console.log('currentPage', this.props.currentPage)
        }
        if (this.props.currentPage == 4) {
            return <Confirmation></Confirmation>
        }
        return null;
    }

    goForward = () => {

        if (this.props.currentPage == 3) {
            this.sendMoney();
        } else {
            this.props.setPage(this.props.currentPage + 1)
            this.refs.view.fadeInRight(300);
        }

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