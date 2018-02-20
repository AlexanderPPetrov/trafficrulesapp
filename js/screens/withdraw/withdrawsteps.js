import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';
import Api from "../../../Api";
import {View, Text} from 'react-native';

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
import Amount from '../../common/amount/amount'
import Notes from './notes'
import Confirmation from '../../common/confirmation/confirmation'
import I18n from '../../../i18n/i18n'
import Ui from '../../common/ui'

class WithdrawSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethod: '',
            account: '',
            amount: '',
            minAmount: 0,
            maxAmount: 0,
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
        });

        this.props.disableButton(false)
    }

    changeValue = (key, value) => {

        if (key == 'amount') {
            value = value.replace(/[^0-9.]/g, '')
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }
        this.setState({
            [key]: value
        });

        if (value != '') {
            this.props.disableButton(false)
        } else {
            this.props.disableButton(true)
        }
    }

    withdrawMoney = () => {
        Api.post({
            url: 'withdraw',
            data: {
                payment_method: this.state.paymentMethod,
                account: this.state.account,
                amount: this.state.amount,
                notes: this.state.notes
            },
            success: this.withdrawSuccess
        })
    }

    withdrawSuccess = (response) => {
        this.setState({
            status: response._status
        })
        this.props.onUpdatePage(5)
        this.refs.view.fadeInRight(300);
    }

    renderStep = () => {

        if (this.props.currentPage == 0) {
            return <PaymentMethod setPayment={this.setPayment} disableButton={this.props.disableButton}
                                  paymentMethod={this.state.paymentMethod}/>
        }
        if (this.props.currentPage == 1) {
            return <Account onValueChange={this.changeValue} disableButton={this.props.disableButton}
                            account={this.state.account}/>
        }
        if (this.props.currentPage == 2) {
            return <Amount label={I18n.t('withdrawAmount')}
                            onValueChange={this.changeValue}
                            amount={this.state.amount} />
        }
        if (this.props.currentPage == 3) {
            return <Notes onValueChange={this.changeValue} disableButton={this.props.disableButton}
                          notes={this.state.notes}/>
        }
        if (this.props.currentPage == 4) {
        }
        if (this.props.currentPage == 5) {
            return <Confirmation
                        status={'success'}
                        statusMessage={I18n.t('withdrawConfirmation')}
                        description={I18n.t('withdrawSuccess')}
                    />
        }
        return null;
    }

    goForward = () => {
        if (this.props.currentPage == 3) {
            this.withdrawMoney()

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