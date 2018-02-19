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

import {View, TouchableOpacity} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import ColorScheme from "../../common/colorscheme";

import styles from "./styles";
import Api from "../../../Api";

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


    componentDidMount = () => {
        //Hardcoded for now
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

    getAmountField = () => {
        if (this.props.selectedAccount != 'none') {
            return <View>
                <Text style={Ui.formLabel}>{I18n.t('amount')}</Text>
                <Grid>
                    <Row>
                        <Col>
                            <Form style={[Ui.inputContainer]}>
                                <Input style={[Ui.inputField, Ui.amountInput]} placeholder="0"
                                       value={this.props.accountAmount}
                                       placeholderTextColor={ColorScheme.lighter}
                                       onChangeText={(amount) => this.props.changeAccountValue(this.props.stateKey, 'accountAmount', amount)}
                                       keyboardType='numeric'/>
                            </Form>
                        </Col>
                        <Col style={{width: 60}}>
                            <Text style={Ui.amountCurrency}>{this.props.currency}</Text>
                        </Col>
                        <Col style={{width: 60, alignItems:'center', justifyContent:'center'}}>
                            <Button transparent primary style={styles.removeAccountButton}
                                    onPress={() => this.props.addAccount(this.props.stateKey)}>
                                <Icon name="ios-add-circle" style={styles.addAccountIcon}/>
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </View>
        }
        return null

    };

    pickChangeHandler = (value) => {
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

    getAccount = (account, i) => {
        return <View key={i} style={styles.accountInList}>
            <Grid>
                <Row>
                    <Col>
                        <Text style={[Ui.itemLabel, styles.accountLabel]}>{account.username}</Text>
                    </Col>
                    <Col>
                        <Text
                            style={[Ui.balanceValue, styles.accountAmount]}>{account.amount} {this.props.currency}</Text>
                    </Col>
                    <Col style={{width: 45, alignItems:'flex-end', justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.props.removeAccount(this.props.stateKey, account._id)}>
                            <Icon name="ios-close-circle-outline" style={styles.removeAccountIcon}/>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>
        </View>;
    };

    getAccounts = () => {
        let accounts = this.props.selectedAccounts.map((account, i) =>
            this.getAccount(account, i)
        );

        return <View>
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
                    <View style={styles.accountsList}>
                        {this.getAccounts()}
                    </View>
                </View>
            </View>
        );
    }
}

export default AddAccount;
