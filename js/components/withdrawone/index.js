import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Card,
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

import {View, ScrollView} from 'react-native';


import StepIndicator from 'react-native-step-indicator';

import styles from "./styles";
import Api from "../../../Api";

const labels = ["","","","",""];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}

class WithdrawOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                paymentMethods:[],
                currentPosition: 0
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
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('withdraw')}</Title>
                    </Body>
                    <Right>
                        <Button transparent small>
                            <Text style={{textAlign:'right'}}>{I18n.t('cancel')}</Text>
                        </Button>
                    </Right>

                </Header>
                <Content>

                    <ScrollView style={[styles.balancePadding, styles.balancesContainer]}>
                        <Text>{I18n.t('selectPaymentMethod')}</Text>

                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                        />
                        <Card>
                            <PickerField ref='selectMethod'
                                         label={I18n.t('selectMethod')}
                                         options={this.prepareData(this.state._payload.paymentMethods)}

                            />
                        </Card>
                    </ScrollView>




                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate("WithdrawTwo")}>
                            <Text>{I18n.t('continue')}</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

export default WithdrawOne;
