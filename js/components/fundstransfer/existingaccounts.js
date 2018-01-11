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

import {View, ScrollView} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import ColorScheme from "../../common/colorscheme";

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class ExistingAccounts extends Component {


    componentDidMount = () => {
        // if (this.props.paymentMethod == '') {
        //     this.props.disableButton(true)
        // }

        Api.get({
            url: 'get-member-accounts',
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) => {
        this.props.onExistingValues(response.accounts)
    }

    getAmountField = () => {
        if(this.props.amountVisible){
            return <View>
                <Text style={styles.formLabel}>{I18n.t('amount')}</Text>
                <Grid>
                    <Row>
                        <Col>
                            <Form style={styles.inputContainer}>
                                    <Input style={[styles.inputField, styles.amountInput]} placeholder="0" value={this.props.amount}
                                           placeholderTextColor={ColorScheme.lighter}
                                           onChangeText={(text) => this.props.onValueChange('existingAccountAmount', text)}
                                           keyboardType='numeric'/>
                            </Form>
                        </Col>
                        <Col style={{width:60}}>
                            <Text style={styles.amountCurrency}>{this.props.currency}</Text>
                        </Col>
                    </Row>

                </Grid>
            </View>
        }
        return null

    }

    getPicker = () => {

        const listItems = this.props.existingAccounts.map((method, i) =>
            <Item key={i} value={method._id} label={method._username}></Item>
        );
        return (
            <Picker
                mode="dropdown"
                placeholder={I18n.t('paymentMethod')}
                iosHeader=" "
                selectedValue={this.props.selectedExistingAccount}
                onValueChange={(value) =>
                    this.props.onValueChange('selectedExistingAccount', value)
                }
                note={false}
            >
                {listItems}
            </Picker>

        );
    }

    render() {


        return (
            <View>
                <Text style={styles.formLabel}>{I18n.t('transferToExistingAccount')}</Text>
                <View>
                    <Form style={styles.form}>
                        <View style={styles.inputContainer}>
                            {this.getPicker()}
                        </View>
                    </Form>

                </View>
                {this.getAmountField()}
            </View>
        );
    }
}

export default ExistingAccounts;
