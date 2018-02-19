import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import FundsTransferSteps from './fundstransfersteps';
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
import Controller from '../../../Controller';
import Header from '../../common/header/header';

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

const labels = [I18n.t('existing'), I18n.t('new'), I18n.t('notes'), I18n.t('transfer')];
import Ui from '../../common/ui';

class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            steps:4,
            buttonDisabled: false,
            paymentData: {}
        }
    }

    componentDidMount = () => {
        const {state} = this.props.navigation;
        if(state.params && state.params.paymentData){
            this.setState({
                paymentData: state.params.paymentData
            })
        }
        Chat.show()
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
                    <Text style={Ui.buttonLabel}>{I18n.t('continue').toUpperCase()}</Text>
                </Button>
        )
    };

    getHeader = () => {
        if (this.state.currentPage == 0 || this.state.currentPage == this.state.steps) {
            return <Header
                title={I18n.t('fundsTransfer')}
            />
        }
        return <Header
            title={I18n.t('fundsTransfer')}
            onBack={this.goBackward}
        />
    };

    setPage = (page) => {
        this.setState({
            currentPage: page
        });
        if(page === this.state.steps){
            Chat.hide()
        }else{
            Chat.show()
        }
    };

    render() {
        return (
            <Container style={Ui.container}>

                {this.getHeader()}
                <Content >
                    <View style={Ui.cardContainer}>
                        <View style={{flex:1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={this.state.steps} labels={labels}></Steps>

                            <View style={Ui.formContainer}>
                                {console.log('FundsTransferSteps')}
                                    <FundsTransferSteps currentPage={this.state.currentPage} onRef={ref => (this.tabs = ref)} {...this.props}
                                                        setPage={this.setPage}
                                                        paymentData={this.state.paymentData}
                                                        disableButton={this.setButtonState}></FundsTransferSteps>

                                <View style={Ui.buttonsContainer}>
                                    {this.getButton()}
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
                <Chat/>
            </Container>
        );
    }
}

export default Withdraw;
