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

import {View, ScrollView} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import ColorScheme from "../../common/colorscheme";
import CommonPicker from '../../common/picker/picker';

import styles from "./styles";
import Api from "../../../Api";

const PickerItem = Picker.Item;

class AddAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currencies:[]
        }
    }
    componentDidMount = () => {

            Api.get({
                url: 'get-currencies',
                success: this.dataLoaded
            })


            if(this.props.account === '' ){
                this.props.disableButton(true)
            }else{
                this.props.disableButton(false)
            }

            if(this.props.account == ''){
                if(this.refs.emailInput){
                    this.refs.emailInput._root.focus()
                }
            }
    }

    dataLoaded = (response) => {

        if(response.currencies.length > 0){
            this.setState({
                currencies:response.currencies
            }, function(){
                this.props.changeValue('currency',response.currencies[0]._code)
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
        if(this.props.notesVisible) {
            return <Form style={Ui.form}>
                <Item style={Ui.inputContainer}>
                    <Input style={Ui.inputField} placeholderTextColor={ColorScheme.lighter} multiline={true} numberOfLines={2} blurOnSubmit={false} placeholder={I18n.t('message')}
                           value={this.props.notes} onChangeText={(text) => this.props.changeValue('notes', text)} />
                </Item>
            </Form>
        }
        return <Button transparent primary style={styles.removeAccountButton} onPress={() => this.props.changeValue('notesVisible', true)}>
                    <Text>{I18n.t('addMessage')}</Text>
                </Button>

    }

    render() {


        return (
            <View>
                <Text style={Ui.formLabel}>{I18n.t('sendMoneyTo')}</Text>
                <View>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={Ui.form}>
                                    <View style={Ui.inputContainer}>
                                        <Input ref="emailInput" style={Ui.inputField} placeholder={I18n.t('enterEmail')} value={this.props.account}
                                               placeholderTextColor={ColorScheme.lighter}
                                               onChangeText={(text) => this.props.changeValue('account', text)}
                                                />
                                    </View>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.currencyPicker}>
                                {this.getPicker()}
                            </Col>
                            <Col style={{paddingLeft:15}}>
                                <Form style={[Ui.inputContainer]}>

                                    <Input style={[Ui.inputField, Ui.amountInput]} placeholder="" value={this.props.amount}
                                           placeholderTextColor={ColorScheme.lighter}
                                           onChangeText={(amount) => this.props.changeValue('amount', amount)}
                                           keyboardType='numeric'/>
                                </Form>
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
