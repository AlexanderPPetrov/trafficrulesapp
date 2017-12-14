import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Card,
    CardItem
} from "native-base";

import { Form,
    Separator,InputField, LinkField,
    SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import styles from "./styles";
import Api from "../../../Api";
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import {View, ScrollView} from 'react-native';

class WithdrawTwo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                paymentMethods:[]
            }

        }
    }

    componentDidMount = () => {
        Api.get({
            url: 'get-member-payment-options',
            success: this.dataLoaded
        })
    }

    dataLoaded = (response) =>{
        this.setState({
            _payload:response
        })
    }

    prepareData = (data) => {
        let selectData = {
        };
        data.map((value) => {
            selectData[value._key] = value._caption
        });
        return selectData;
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('WithdrawOne')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('withdraw')}</Title>
                    </Body>
                    <Right>
                        <Button transparent small>
                            <Text style={{textAlign: 'right'}}>{I18n.t('cancel')}</Text>
                        </Button>
                    </Right>

                </Header>
                <Content padder>
                    <Steps currentPosition={1} stepCount={5}></Steps>
                    <Card style={{minHeight: 200}}>

                        <CardItem header>
                            <Text>{I18n.t('selectPaymentMethod')}</Text>
                        </CardItem>
                        <View style={{paddingLeft: 15, paddingRight: 15}}>
                            <Form style={{borderWidth: 1, borderColor: '#d6d7da'}}>


                            </Form>
                        </View>

                    </Card>

                    <Chat></Chat>

                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate("WithdrawThree", {
                            methodSelected: this.props.selected,

                        })}>
                            <Text>{I18n.t('continue')}</Text>
                        </Button>

                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

export default WithdrawTwo;
