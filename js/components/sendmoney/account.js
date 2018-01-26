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

import {View, ScrollView} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import ColorScheme from "../../common/colorscheme";

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class AddAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currencies:[],
            notesVisible: false
        }
    }
    componentDidMount = () => {

            Api.get({
                url: 'get-currencies',
                success: this.dataLoaded
            })


    }

    dataLoaded = (response) => {
        this.setState({
            currencies:response.currencies
        })
    }


    getPicker = () => {

        const listItems = this.state.currencies.map((currency, i) =>
            <Item key={i} value={currency._code} label={currency._code}></Item>
        );
        return (
            <Picker
                mode="dropdown"
                placeholder={I18n.t('selectCurrency')}
                iosHeader=" "
                selectedValue={this.props.currency}
                onValueChange={(value) =>
                    this.props.changeValue('currency', value)
                }
                note={false}
                renderHeader={backAction =>
                    <Header >
                        <Left>
                            <Button transparent onPress={backAction}>
                                <Icon name="arrow-back"  />
                            </Button>
                        </Left>
                        <Body style={{ flex: 3 }}>

                        </Body>
                        <Right />
                    </Header>}
            >
                {listItems}
            </Picker>

        );
    };


    getMessageField = () => {
        if(this.state.notesVisible) {
            return    <Form style={styles.form}>
                <Item style={styles.inputContainer}>
                    <Input style={styles.inputField} placeholderTextColor={ColorScheme.lighter} multiline={true} numberOfLines={2} blurOnSubmit={false} placeholder={I18n.t('message')}
                           value={this.props.notes} onChangeText={(text) => this.props.setValue('notes', text)} />
                </Item>
            </Form>
        }
        return
                <Button transparent primary style={styles.removeAccountButton} onPress={() => this.setState({notesVisible: true})}>
                    <Text>{I18n.t('addMessage')}</Text>
                </Button>

    }

    render() {


        return (
            <View>
                <Text style={styles.formLabel}>{this.props.label}</Text>
                <View>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={styles.form}>
                                    <View style={styles.inputContainer}>
                                        <Input style={styles.inputField} placeholder={I18n.t('enterEmail')} value={this.props.account}
                                               placeholderTextColor={ColorScheme.lighter}
                                               onChangeText={(text) => this.props.changeValue('account', text)}
                                                />
                                    </View>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.currencyPicker}>
                                <Form style={[styles.inputContainer]}>
                                    {this.getPicker()}
                                </Form>
                            </Col>
                            <Col style={{paddingLeft:15}}>
                                <Form style={[styles.inputContainer]}>

                                    <Input style={[styles.inputField, styles.amountInput]} placeholder="1" value={this.props.amount}
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
