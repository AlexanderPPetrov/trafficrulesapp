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
import AddAccount from './addaccount'
import Notes from './notes'
import Confirmation from './confirmation'
import * as Animatable from 'react-native-animatable';


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
                accounts:[],
                loadedAccounts:[]
            },
            new: {
                selectedAccount: 'none',
                accountAmount:'1',
                selectedAccounts:[],
                accounts:[],
                loadedAccounts:[]
            },
            empty: [{
                _id: 'none',
                _username: I18n.t('selectAccount')
            }],
            minAmount: '1',
            notes: '',
            currency:''
        }
    }

    componentDidMount() {
        this.props.onRef(this)
        AsyncStorage.getItem('accountSettings').then((value) => {
            this.setState({
                currency:JSON.parse(value)._currency
            })
        });
    }

    addAccount = (stateKey) => {

        const current = this.state[stateKey];
        if(current.selectedAccount == 'none'){
            return;
        }
        let remainingAccounts = current.accounts.filter((account) => {
            if (account._id !== current.selectedAccount) return account;
        });

        const account = _.filter(current.accounts, { _id: current.selectedAccount})[0];
        let selectedAccount = {_id: account._id, amount: current.accountAmount, username: account._username};
        current.selectedAccounts.push(selectedAccount);
        this.setState({ [stateKey]: { ...current,
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
        let accountsList = [...this.state.empty, ...accounts];

        let selectedAccounts = this.state[stateKey].selectedAccounts;
        let remainingAccounts = _.differenceBy(accountsList, selectedAccounts, '_id');

        this.setState({ [stateKey]: { ...this.state[stateKey], accounts: remainingAccounts, loadedAccounts: accounts} });

    };

    setNotes = (value) => {
        this.setState({
            notes: value
        }, () => {
            this.checkButton();
        })
    };

    changeAccountValue = (stateKey, key, value) => {

        if(key === 'accountAmount'){
            value = value.replace(/[^0-9.]/g, '');
            if(value == ''){
                value = this.state.minAmount
            }
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }

        this.setState({ [stateKey]: { ...this.state[stateKey], [key]: value} });

    };

    transferFunds = () => {
        Api.post({
            url: 'transfer',
            data: this.getTransferData(),
            success: this.fundsTransferSuccess,
        })
    };

    getTransferData = () => {
        let data = {
            notes: this.state.notes
        };

        if(!_.isEmpty(this.props.paymentData)){
            data = {...data, ...this.props.paymentData}
        }

        const existingAccounts = this.state.existing.selectedAccounts;
        if(existingAccounts.length > 0){
            data.existing_accounts_site = existingAccounts.map((account)=>{
                return account._id
            });
            data.existing_accounts_amount = existingAccounts.map((account)=>{
                return account._id
            });
        }

        const newAccounts = this.state.new.selectedAccounts;
        if(newAccounts.length > 0){
            data.new_accounts_site = newAccounts.map((account)=>{
                return account._id
            });
            data.new_accounts_amount = newAccounts.map((account)=>{
                return account.amount
            })
        }

        console.log(data)
        //this.props.screenProps

        return data;
    }

    // data.append("new_accounts_site[0]", "IBC");
    // data.append("new_accounts_amount[0]", "2");
    // data.append("existing_accounts_site[0]", "245");
    // data.append("existing_accounts_amount[0]", "2");

    fundsTransferSuccess = () => {
        console.log('success')
        this.props.setPage(4)
    }

    renderStep = () => {

        if (this.props.currentPage == 0) {

            return <AddAccount       key={0}
                                     changeAccountValue={this.changeAccountValue}
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

            return <AddAccount       key={1}
                                     changeAccountValue={this.changeAccountValue}
                                     label={I18n.t('transferToNewAccount')}
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

    checkButton = () => {
        if(this.state.notes === '' && this.state.new.selectedAccounts.length === 0 && this.state.existing.selectedAccounts.length === 0){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
    }

    goForward = () => {

        if (this.props.currentPage == 0) {
            this.addAccount('existing');
        }

        if (this.props.currentPage == 1) {
            this.addAccount('new');
            this.checkButton()
        }

        if (this.props.currentPage == 2) {
            this.transferFunds()

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

export default FundsTransferSteps;