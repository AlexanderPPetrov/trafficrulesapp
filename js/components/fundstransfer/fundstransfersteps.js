import React, {Component} from 'react';
import {Animated, Easing, View, Text, AsyncStorage} from 'react-native';
import styles from "./styles";
// Import the transition library
import * as Animatable from 'react-native-animatable';
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

import ExistingAccounts from './existingaccounts'
import NewAccounts from "./newaccounts"
import Amount from './amount'
import Notes from './notes'
import Confirmation from './confirmation'


// Just helper method to get one of the random colors

// Create Transition component using FlipX transition

class FundsTransferSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedExistingAccount: '',
            existingAccountAmount: '0',
            selectedExistingAccounts: [],
            existingAccountAmountVisible: false,
            existingAccounts: [{
                _id: 'none',
                _username: I18n.t('selectAccount')
            }],

            selectedNewAccount: '',
            newAccountAmount: '0',
            minAmount: '1',
            newAccounts: [],
            notes: '',
            currency:''
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.payment_id)
        this.props.onRef(this)
        AsyncStorage.getItem('accountSettings').then((value) => {
            this.setState({
                currency:JSON.parse(value)._currency
            })
        });
    }

    addExistingAccount = () => {
        const existingAccount = {id: this.state.selectedExistingAccount, amount: this.state.existingAccountAmount};
        this.state.selectedExistingAccounts.push(existingAccount);
        this.setState({
            selectedExistingAccounts: this.state.selectedExistingAccounts,
            selectedExistingAccount: '',
            existingAccountAmount: '0'
        });
    }

    removeExistingAccount(id) {
        const remainder = this.state.existingAccounts.filter((account) => {
            if (account.id !== id) return account;
        });
        this.setState({existingAccounts: remainder});
    }

    setExistingAccounts = (accounts) => {
        this.setState({
            existingAccounts: [...this.state.existingAccounts, ...accounts]
        })
    }

    changeValue = (key, value) => {

        if (key == 'existingAccountAmount') {
            value = value.replace(/[^0-9.]/g, '');
            console.log(Number.parseFloat(value), Number.parseFloat(this.state.minAmount))
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }
        this.setState({
            [key]: value
        });


        if(key == 'selectedExistingAccount'){
            if(value == 'none'){
                this.setState({
                    existingAccountAmountVisible: false
                })
            }else{
                this.setState({
                    existingAccountAmountVisible: true
                })
            }
        }


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
            success: this.fundsTransferSuccess
        })
    }


    // data.append("new_accounts_site[0]", "IBC");
    // data.append("new_accounts_amount[0]", "2");
    // data.append("notes", "test note");
    // data.append("existing_accounts_site[0]", "245");
    // data.append("existing_accounts_amount[0]", "2");


    fundsTransferSuccess = () => {
        this.props.onUpdatePage(4)
        this.refs.view.fadeInRight(300);
    }

    renderStep = () => {

        if (this.props.currentPage == 0) {
            return <ExistingAccounts onValueChange={this.changeValue}
                                     onExistingValues={this.setExistingAccounts}
                                     amountVisible={this.state.existingAccountAmountVisible}
                                     amount={this.state.existingAccountAmount}
                                     disableButton={this.props.disableButton}
                                     selectedExistingAccount={this.state.selectedExistingAccount}
                                     currency={this.state.currency}
                                     existingAccounts={this.state.existingAccounts}></ExistingAccounts>
        }
        if (this.props.currentPage == 1) {
            return <NewAccounts onValueChange={this.changeValue} disableButton={this.props.disableButton}
                                account={this.state.account}></NewAccounts>
        }

        if (this.props.currentPage == 2) {
            return <Notes onValueChange={this.changeValue} disableButton={this.props.disableButton}
                          notes={this.state.notes}></Notes>
        }
        if (this.props.currentPage == 3) {
        }
        if (this.props.currentPage == 4) {
            return <Confirmation></Confirmation>
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

export default FundsTransferSteps;