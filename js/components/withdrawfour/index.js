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
    Body
} from "native-base";

import { Form,
    Separator,InputField, LinkField,
    SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import styles from "./styles";
import Api from "../../../Api";

class WithdrawFour extends Component {

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
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('WithdrawThree')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('withdraw')}</Title>
                    </Body>
                    <Right/>

                </Header>
                <Content>
                    <Text>{I18n.t('notes')}</Text>

                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate("WithdrawFive")}>
                            <Text>{I18n.t('continue')}</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

export default WithdrawFour;
