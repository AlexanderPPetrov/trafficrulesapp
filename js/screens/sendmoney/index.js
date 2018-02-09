import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import SendMoneySteps from './sendmoneysteps';
import {
    Container,
    Card,
    CardItem,
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
import Header from '../../common/header/header';

import {View, ScrollView} from 'react-native';
import Ui from '../../common/ui';
import styles from "./styles";
import Api from "../../../Api";
import Controller from '../../../Controller';

const Item = Picker.Item;

const labels = [I18n.t('account'), I18n.t('yourSecureId'), I18n.t('confirmation'), I18n.t('sendMoney')];

class SendMoney extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            steps:4,
            buttonDisabled: true,
            loaded: false
        }
    }

    componentDidMount = () => {

        Api.get({
            url: 'is-member-send-money-allowed',
            success: this.dataLoaded,
        })

    };

    dataLoaded = (response) => {
        this.setState({
            loaded: true
        })
    };

    setButtonState = (value) => {
        this.setState({
            buttonDisabled: value
        })
    };

    goBackward = () => {
        this.tabs.goBackward()
    };

    goForward = () => {
        this.tabs.goForward()
    };

    getButton = () => {
        if (this.state.currentPage == this.state.steps) {
            return null;
        }
        return (
            <Button primary rounded style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                <Text style={Ui.buttonLabel}>{I18n.t('continue')}</Text>
            </Button>
        )

    };

    getHeader = () => {

        if (this.state.currentPage == 0 || this.state.currentPage == this.state.steps) {
            return <Header
                title={I18n.t('sendMoney')}
            />
        }
        return <Header
            title={I18n.t('sendMoney')}
            onBack={this.goBackward}
        />
    }

    setPage = (page) => {
        this.setState({
            currentPage: page
        });
    };

    render() {
        return (
            <Container style={Ui.container}>
                {this.getHeader()}
                <Content>
                    <View style={Ui.cardContainer}>
                        <View style={{flex: 1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={this.state.steps} labels={labels}></Steps>

                            <View style={Ui.formContainer}>
                                <SendMoneySteps currentPage={this.state.currentPage}
                                                onRef={ref => (this.tabs = ref)} {...this.props}
                                                setPage={this.setPage}
                                                disableButton={this.setButtonState}></SendMoneySteps>

                                <View style={Ui.buttonsContainer}>
                                    {this.getButton()}
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>

            </Container>
        );
    }
}

export default SendMoney;
