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
import _ from 'lodash'
import {Toast} from "native-base";
import AddAccount from './addaccount'
import Notes from './notes'
import Confirmation from './confirmation'


// Just helper method to get one of the random colors

// Create Transition component using FlipX transition

class FundsTransferSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            existing: {
                selectedAccount: 'none',
                accountAmount:'1',
                selectedAccounts:[],
                accounts:[{
                    _id: 'none',
                    _username: I18n.t('selectAccount')
                }],
                loadedAccounts:[]
            },
            new: {
                selectedAccount: 'none',
                accountAmount:'1',
                selectedAccounts:[],
                accounts:[{
                    _id: 'none',
                    _username: I18n.t('selectAccount')
                }],
                loadedAccounts:[]
            },
            minAmount: '1',
            notes: '',
            currency:''
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
        this.props.onRef(this)
        AsyncStorage.getItem('accountSettings').then((value) => {
            this.setState({
                currency:JSON.parse(value)._currency
            })
        });
    }

    addAccount = (stateKey) => {

        console.log(stateKey, this.state[stateKey])
        let currentAccounts = this.state[stateKey].accounts;
        let remainingAccounts = currentAccounts.filter((account) => {
            if (account._id !== this.state[stateKey].selectedAccount) return account;
        });

        let account = _.filter(currentAccounts, { _id: this.state[stateKey].selectedAccount})[0];
        let selectedAccount = {_id: account._id, amount: this.state[stateKey].accountAmount, username: account._username};
        this.state[stateKey].selectedAccounts.push(selectedAccount);
        this.setState({ [stateKey]: { ...this.state[stateKey],
            selectedAccounts: this.state[stateKey].selectedAccounts,
            selectedAccount: 'none',
            accountAmount: this.state.minAmount,
            accounts: remainingAccounts
        } });

    };

    removeAccount = (stateKey, id) => {
        let selectedAccounts = this.state[stateKey].selectedAccounts;
        let remainingAccounts = selectedAccounts.filter((account) => {
            if (account._id !== id) return account;
        });

        let accounts = _.without(this.state[stateKey].loadedAccounts, ...remainingAccounts);

        this.setState({ [stateKey]: { ...this.state[stateKey], selectedAccounts: remainingAccounts, accounts: accounts} });
    };

    setAccounts = (stateKey, accounts) => {
        let accountsList = [...this.state[stateKey].accounts, ...accounts]
        this.setState({ [stateKey]: { ...this.state[stateKey], accounts: accountsList, loadedAccounts: accountsList} });

    };

    changeAccountValue = (stateKey, key, value) => {

        if(key === 'accountAmount'){
            value = value.replace(/[^0-9.]/g, '');
            if(value == ''){
                value = this.state.minAmount
            }
            console.log(Number.parseFloat(value), Number.parseFloat(this.state.minAmount))
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }

        this.setState({ [stateKey]: { ...this.state[stateKey], [key]: value} });

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


    fundsTransferSuccess = () => {
        this.props.onUpdatePage(4)
        this.refs.view.fadeInRight(300);
    }

    renderStep = () => {

        if (this.props.currentPage == 0) {
            return <AddAccount       changeAccountValue={this.changeAccountValue}
                                     label={I18n.t('transferToExistingAccount')}
                                     stateKey='existing'
                                     fetchUrl='get-member-accounts'
                                     setAccounts={this.setAccounts}
                                     addAccount={this.addAccount}
                                     removeAccount={this.removeAccount}
                                     accountAmount={this.state.existing.accountAmount}
                                     selectedAccount={this.state.existing.selectedAccount}
                                     selectedAccounts={this.state.existing.selectedAccounts}
                                     currency={this.state.currency}
                                     accounts={this.state.existing.accounts}
            ></AddAccount>
        }
        if (this.props.currentPage == 1) {
            return <AddAccount       changeAccountValue={this.changeAccountValue}
                                     label={I18n.t('transferToExistingAccount')}
                                     stateKey='new'
                                     fetchUrl='get-member-accounts'
                                     setAccounts={this.setAccounts}
                                     addAccount={this.addAccount}
                                     removeAccount={this.removeAccount}
                                     accountAmount={this.state.new.accountAmount}
                                     selectedAccount={this.state.new.selectedAccount}
                                     selectedAccounts={this.state.new.selectedAccounts}
                                     currency={this.state.currency}
                                     accounts={this.state.new.accounts}
            ></AddAccount>
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