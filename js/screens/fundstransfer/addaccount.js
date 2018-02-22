import React, {Component} from "react";
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
    Input,
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
import Ui from '../../common/ui';
import CommonPicker from '../../common/picker/picker';

import {View, TouchableOpacity, Platform} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import ColorScheme from "../../common/colorscheme";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import styles from "./styles";
import Api from "../../../Api";
import Amount from "../../common/amount/amount"
const Item = Picker.Item;

const newAccounts = {
    accounts: [{
        _id: 'IBC',
        _username: 'IBCBet'
    },
        {
            _id: 'SBO',
            _username: 'SBOBet'
        },
        {
            _id: 'PINNACLE',
            _username: 'Pinnacle Sports'
        },
        {
            _id: 'EDYN',
            _username: 'Eastern Dynasty'
        },
        {
            _id: 'SING',
            _username: 'SingBet'
        },
        {
            _id: 'ISN',
            _username: 'ISNBet'
        },
        {
            _id: '1BET',
            _username: '1Bet'
        },
        {
            _id: '18BET',
            _username: '18Bet'
        },
        {
            _id: 'BEX',
            _username: 'Betting Exchange'
        },
        {
            _id: 'BFAIR',
            _username: 'BetFair'
        }
    ]
}

class AddAccount extends Component {


    constructor(props){
        super(props)
        this.state = {
            buttonDisabled: true
        }
    }
    componentDidMount = () => {

        if (this.props.stateKey == 'new') {
            this.dataLoaded(newAccounts)

        } else {
            Api.get({
                url: this.props.fetchUrl,
                success: this.dataLoaded
            })
        }
    };

    dataLoaded = (response) => {
        this.props.setAccounts(this.props.stateKey, response.accounts)
    };

    checkButton = (amount) => {
        let buttonDisabled = false;
        if(!amount) {
            buttonDisabled = true;
        }
        this.setState({
            buttonDisabled
        })

       this.props.disableButton(buttonDisabled)
    }

    getAmountField = () => {
        if (this.props.selectedAccount != 'none') {
            return <View style={{marginTop:25}}>
                        <Amount label={I18n.t('amount')}
                                onValueChange={(key, value) => {
                                    this.props.changeAccountValue(this.props.stateKey, key, value)
                                    this.checkButton(value)
                                }}
                                amount={this.props.amount} />
                </View>
        }
        return null

    };

    getAddMoreButton = () => {
        if (this.props.selectedAccount != 'none') {
            return <View style={{alignItems:'center', justifyContent:'center', width:'100%', paddingTop:25, paddingBottom:40}}>
                <TouchableOpacity transparent primary style={styles.removeAccountButton}
                        disabled={this.state.buttonDisabled}
                        onPress={() => {
                            this.setState({
                                buttonDisabled:true
                            })
                            this.props.addAccount(this.props.stateKey)

                        }}>
                    <MaterialCommunityIcons name="plus" style={styles.addAccountIcon}/>
                    <Text style={styles.addMoreLabel}>{I18n.t('moreAccounts')}</Text>
                </TouchableOpacity>
            </View>
        }
        return null;

    }

    pickChangeHandler = (value) => {
        if(value != 'none'){
            this.props.hideChat()
        }
        if(value != 'none' && !this.props.amount){
            this.props.disableButton(true)
        }else{
            this.props.disableButton(false)
        }
        this.props.changeAccountValue(this.props.stateKey, 'selectedAccount', value)
    };

    getPicker = () => {

        const listItems = this.props.accounts.map((method, i) =>
            <Item key={i} value={method._id} label={method._username}></Item>
        );
        return <CommonPicker
            title={I18n.t('selectAccount')}
            selectedValue={this.props.selectedAccount}
            onValueChange={this.pickChangeHandler}
            listItems={listItems}
        />

    };

    getRemoveContainerStyle = () => {
        let style = {width: 50, alignItems:'flex-end', justifyContent:'flex-end', paddingRight:14}
        if (Platform.OS === 'ios') {
            style.paddingRight = 3
        }
        return style
    }
    getAccount = (account, i) => {
        return <View key={i} >
            <Grid>
                <Row style={styles.accountInList}>
                    <Col style={{justifyContent:'center'}}>
                        <Text style={[Ui.itemLabel, styles.accountLabel]}>{account.username}</Text>
                    </Col>
                    <Col style={{justifyContent:'center'}}>
                        <Text
                            style={[Ui.balanceValue, styles.accountAmount, Ui.bold]}>{account.amount} {this.props.currency}</Text>
                    </Col>
                    <Col style={this.getRemoveContainerStyle()}>
                        <TouchableOpacity onPress={() => this.props.removeAccount(this.props.stateKey, account._id)}>
                            <Icon name="ios-close-circle-outline" style={styles.removeAccountIcon}/>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>
        </View>;
    };

    getAccounts = () => {
        if(this.props.selectedAccounts.length == 0) return null;
        let accounts = this.props.selectedAccounts.map((account, i) =>
            this.getAccount(account, i)
        );

        return <View style={styles.accountsList}>
            {accounts}
        </View>
    };

    render() {
        return (
            <View>
                <Text style={Ui.formLabel}>{this.props.label}</Text>
                <View>
                    <Form style={Ui.form}>
                        {this.getPicker()}
                        {this.getAmountField()}
                    </Form>
                        {this.getAccounts()}
                        {this.getAddMoreButton()}
                </View>
            </View>
        );
    }
}

export default AddAccount;
