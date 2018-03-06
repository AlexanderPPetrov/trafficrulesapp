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
    Item,
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

import {View, TouchableOpacity} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import CommonPicker from '../../common/picker/picker';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import styles from "./styles";
import Api from "../../../Api";

const PickerItem = Picker.Item;

class AddAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currencies: []
        }
    }

    componentDidMount = () => {

        Api.get({
            url: 'get-currencies',
            success: this.dataLoaded
        })


        if (this.props.account === '') {
            this.props.disableButton(true)
            if (this.refs.emailInput) {
                this.refs.emailInput._root.focus()
            }
        } else {
            this.props.disableButton(false)
        }

    }


    focusNext = () => {
        if (this.props.account && this.props.amount === '') {
            this.refs.amount._root.focus()
        }
    }

    dataLoaded = (response) => {

        if (response.currencies.length > 0) {
            this.setState({
                currencies: response.currencies
            }, function () {
                this.props.changeValue('currency', response.currencies[0]._code)
            })
        }

    };

    getPicker = () => {

        const listItems = this.state.currencies.map((currency, i) =>
            <PickerItem key={i} value={currency._code} label={currency._code}></PickerItem>
        );
        return (

            <CommonPicker
                title={I18n.t('selectCurrency')}
                selectedValue={this.props.currency}
                onValueChange={(value) =>
                    this.props.changeValue('currency', value)}
                listItems={listItems}
            />

        );
    };


    getMessageField = () => {
        if (this.props.notesVisible) {
            let autoFocus = true;
            if(this.props.notes){
                autoFocus = false;
            }
            return <Form style={[Ui.form, {marginTop: 25}]}>
                <Text style={Ui.formLabel}>{I18n.t('addMessage')}</Text>
                <Item style={Ui.inputContainer}>
                    <Input autoFocus={autoFocus} style={Ui.inputField} multiline={true} numberOfLines={2} blurOnSubmit={false}
                           value={this.props.notes} onChangeText={(text) => this.props.changeValue('notes', text)}/>
                </Item>
            </Form>
        }
        return <View style={Ui.addContainer}>
            <TouchableOpacity transparent primary onPress={() => this.props.changeValue('notesVisible', true)}>
                <MaterialCommunityIcons name="plus" style={Ui.addAccountIcon}/>
                <Text style={Ui.addMoreLabel}>{I18n.t('addMessage')}</Text>
            </TouchableOpacity>
        </View>
    }

    render() {

        return (
            <View>
                <Text style={Ui.stepHeader}>{I18n.t('selectAccount')}</Text>
                <View>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={Ui.form}>
                                    <Text style={Ui.formLabel}>{I18n.t('sendMoneyTo')}</Text>
                                    <View style={Ui.inputContainer}>
                                        <Input ref="emailInput" style={Ui.inputField} value={this.props.account}
                                               onBlur={() => this.focusNext()}
                                               onChangeText={(text) => this.props.changeValue('account', text)}
                                        />
                                    </View>
                                </Form>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 25}}>
                            <Text style={Ui.formLabel}>{I18n.t('amount')}</Text>
                        </Row>
                        <Row>
                            <Col>
                                <Form style={[Ui.inputContainer]}>
                                    <Input ref="amount" style={[Ui.inputField, Ui.amountInput]}
                                           value={this.props.amount}
                                           onChangeText={(amount) => this.props.changeValue('amount', amount)}
                                           keyboardType='numeric'/>
                                </Form>
                            </Col>
                            <Col style={[styles.currencyPicker, {paddingLeft: 15}]}>
                                {this.getPicker()}
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {this.getMessageField()}
                            </Col>
                        </Row>

                    </Grid>
                </View>


            </View>
        );
    }
}

export default AddAccount;
