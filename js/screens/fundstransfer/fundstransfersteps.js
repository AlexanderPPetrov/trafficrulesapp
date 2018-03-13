import React, {Component} from 'react';
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
import _ from 'lodash';
import {TouchableOpacity} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";

import {Toast} from "native-base";
import AddAccount from './addaccount';
import Ui from '../../common/ui';
import {View} from 'react-native';
import Notes from './notes'
import Confirmation from '../../common/confirmation/confirmation';
import * as Animatable from 'react-native-animatable';
import CommonPicker from '../../common/picker/picker';
import styles from './styles';

const Item = Picker.Item;

class FundsTransferSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            existing: {
                selectedAccount: 'none',
                amount: '',
                selectedAccounts: [],
                accounts: [],
                loadedAccounts: []
            },
            new: {
                selectedAccount: 'none',
                amount: '',
                selectedAccounts: [],
                accounts: [],
                loadedAccounts: []
            },
            empty: [{
                _id: 'none',
                _username: I18n.t('selectAccount')
            }],
            accountType: 'none',
            minAmount: '1',
            notes: '',
            currency: '',
            loaded: false
        }
    }

    componentDidMount() {
        this.props.onRef(this)
        this.setState({
            currency: Api.accountSettings._currency
        })

        if (this.props.paymentData._net_amount) {
            let existingAccounts = {...this.state.existing},
                newAccounts = {...this.state.new};
            existingAccounts.amount = this.props.paymentData._net_amount.toString();
            newAccounts.amount = this.props.paymentData._net_amount.toString();
            this.setState({
                existing: existingAccounts,
                new: newAccounts,
                loaded: true
            })

        } else {
            this.setState({
                loaded: true
            })
        }
    }

    addAccount = (stateKey) => {

        if(stateKey === 'none') return;

        this.props.hideChat()
        const current = this.state[stateKey];
        if (current.selectedAccount == 'none') {
            return;
        }
        let remainingAccounts = current.accounts.filter((account) => {
            if (account._id !== current.selectedAccount) return account;
        });

        const account = _.filter(current.accounts, {_id: current.selectedAccount})[0];
        let selectedAccount = {_id: account._id, amount: current.amount, username: account._username};
        current.selectedAccounts.push(selectedAccount);
        this.setState({
            [stateKey]: {
                ...current,
                selectedAccounts: this.state[stateKey].selectedAccounts,
                selectedAccount: 'none',
                amount: '',
                accounts: remainingAccounts
            }
        });

    };

    removeAccount = (stateKey, id) => {
        let selectedAccounts = this.state[stateKey].selectedAccounts;
        let remainingAccounts = selectedAccounts.filter((account) => {
            if (account._id !== id) return account;
        });

        let accountsList = [...this.state.empty, ...this.state[stateKey].loadedAccounts];
        let accounts = _.differenceBy(accountsList, remainingAccounts, '_id');
        this.setState({[stateKey]: {...this.state[stateKey], selectedAccounts: remainingAccounts, accounts}});
    };

    setAccounts = (stateKey, accounts) => {
        let accountsList = [...this.state.empty, ...accounts];

        let selectedAccounts = this.state[stateKey].selectedAccounts;
        let remainingAccounts = _.differenceBy(accountsList, selectedAccounts, '_id');

        this.setState({[stateKey]: {...this.state[stateKey], accounts: remainingAccounts, loadedAccounts: accounts}});

    };

    setNotes = (value) => {
        this.setState({
            notes: value
        }, () => {
            this.checkButton();
        })
    };

    changeAccountValue = (stateKey, key, value) => {

        if (key === 'amount') {
            value = value.replace(/[^0-9.]/g, '');
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
        }

        this.setState({[stateKey]: {...this.state[stateKey], [key]: value}});

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

        if (!_.isEmpty(this.props.paymentData)) {
            data = {...data, ...this.props.paymentData}
        }

        const existingAccounts = this.state.existing.selectedAccounts;
        if (existingAccounts.length > 0) {
            data.existing_accounts_site = existingAccounts.map((account) => {
                return account._id
            });
            data.existing_accounts_amount = existingAccounts.map((account) => {
                return account._id
            });
        }

        const newAccounts = this.state.new.selectedAccounts;
        if (newAccounts.length > 0) {
            data.new_accounts_site = newAccounts.map((account) => {
                return account._id
            });
            data.new_accounts_amount = newAccounts.map((account) => {
                return account.amount
            })
        }

        //this.props.screenProps

        return data;
    }

    fundsTransferSuccess = () => {
        this.props.setPage(3)
    }

    changeAccountType = (accountType) => {
        this.setState({
            accountType
        })
    }

    getAccountTypePicker = () => {

        const types = [{
            id: 'none',
            label: I18n.t('select') + '...'
        }, {
            id: 'existing',
            label: I18n.t('existingAccounts')
        },
            {
                id: 'new',
                label: I18n.t('transferToNewAccount')
            }
        ]

        const listItems = types.map((type, i) =>
            <Item key={i} value={type.id} label={type.label}></Item>
        );
        return <CommonPicker
            title={I18n.t('selectAccount')}
            selectedValue={this.state.accountType}
            onValueChange={this.changeAccountType}
            listItems={listItems}
        />

    };

    getAccountSelectPicker = () => {
        if(this.state.accountType === 'existing'){
            return <AddAccount key={0}
                               changeAccountValue={this.changeAccountValue}
                               label={I18n.t('existingAccounts')}
                               stateKey='existing'
                               fetchUrl='get-member-accounts'
                               setAccounts={this.setAccounts}
                               addAccount={this.addAccount}
                               removeAccount={this.removeAccount}
                               amount={this.state.existing.amount}
                               selectedAccount={this.state.existing.selectedAccount}
                               selectedAccounts={this.state.existing.selectedAccounts}
                               currency={this.state.currency}
                               accounts={this.state.existing.accounts}
                               disableButton={this.props.disableButton}
                               hideChat={this.props.hideChat}
            />
        }
        if(this.state.accountType === 'new'){
            return <AddAccount key={1}
                               changeAccountValue={this.changeAccountValue}
                               label={I18n.t('transferToNewAccount')}
                               stateKey='new'
                               fetchUrl='get-member-accounts'
                               setAccounts={this.setAccounts}
                               addAccount={this.addAccount}
                               removeAccount={this.removeAccount}
                               amount={this.state.new.amount}
                               selectedAccount={this.state.new.selectedAccount}
                               selectedAccounts={this.state.new.selectedAccounts}
                               currency={this.state.currency}
                               accounts={this.state.new.accounts}
                               disableButton={this.props.disableButton}
                               hideChat={this.props.hideChat}
            />
        }

        return null
    }


    getAccount = (account, i, type) => {
        let style = [styles.accountInList, {backgroundColor: 'rgba(255,174,0,0.15)'}]
        if(type === 'new'){
            style = [styles.accountInList, {backgroundColor: 'rgba(24,191,119,0.15)'}]
        }
        return <View key={i} >
            <Grid>
                <Row style={style}>
                    <Col style={{justifyContent:'center'}}>
                        <Text style={[Ui.itemLabel, styles.accountLabel]}>{account.username}</Text>
                    </Col>
                    <Col style={{justifyContent:'center'}}>
                        <Text
                            style={[Ui.balanceValue, styles.accountAmount, Ui.bold]}>{account.amount} {this.state.currency}</Text>
                    </Col>
                    <Col style={{width: 50, alignItems:'flex-end', justifyContent:'flex-end', paddingRight:15}}>
                        <TouchableOpacity onPress={() => this.removeAccount(type, account._id)}>
                            <Icon name="ios-close-circle-outline" style={styles.removeAccountIcon}/>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>
        </View>;
    };

    getAccounts = (type) => {
        if(this.state[type].selectedAccounts.length == 0) return null;
        let accounts = this.state[type].selectedAccounts.map((account, i) =>
            this.getAccount(account, i, type)
        );

        return <View>
            {accounts}
        </View>
    };

    getAccountList = () => {
        if(this.state.new.selectedAccounts.length === 0 && this.state.existing.selectedAccounts.length === 0) return null
        return <View style={styles.accountsList}>
            {this.getAccounts('existing')}
            {this.getAccounts('new')}
        </View>
    }
    renderStep = () => {

        if (!this.state.loaded) return null

        if (this.props.currentPage == 0) {

            return <View>
                <Text style={Ui.stepHeader}>{I18n.t('transferTo')}</Text>
                    {this.getAccountTypePicker()}
                <View style={{marginTop:15}}>
                    {this.getAccountSelectPicker()}
                </View>
                    {this.getAccountList()}
            </View>

        }

        if (this.props.currentPage == 1) {

            return <Notes setNotes={this.setNotes} disableButton={this.props.disableButton}
                          notes={this.state.notes}/>
        }

        if (this.props.currentPage == 3) {
            return <Confirmation
                status={'success'}
                statusMessage={I18n.t('fundsTransferConfirmation')}
                description={I18n.t('fundsTransferSuccess')}
                additionalText={I18n.t('fundsTransferSuccessAdditional')}
            />
        }
        return null;
    }

    checkButton = () => {
        if (this.state.notes === '' && this.state.new.selectedAccounts.length === 0 && this.state.existing.selectedAccounts.length === 0) {
            this.props.disableButton(true)
        } else {
            this.props.disableButton(false)
        }
    }

    goForward = () => {

        if (this.props.currentPage == 0) {
            this.addAccount(this.state.accountType);
            this.checkButton()

        }

        if (this.props.currentPage == 1) {
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