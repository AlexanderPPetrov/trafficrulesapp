import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import WithdrawSteps from './withdrawsteps';
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
import Ui from '../../common/ui';

const Item = Picker.Item;

const labels = [I18n.t('method'), I18n.t('account'), I18n.t('amount'), I18n.t('notes'), I18n.t('withdraw')];

class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            steps:5,
            buttonDisabled: true,
            openedRequests: 0
        }
    }

    componentDidMount = () => {
        Api.get({
            url:'get-member-pending-withdraw-requests-count',
            success: this.setOpenedRequests
        })
        Chat.show()
    }
    componentWillUnmount = () =>{
        Chat.hide()
    }

    setOpenedRequests = (response) => {
        this.setState({
            openedRequests: response._pending_withdraws
        })
    }

    setButtonState = (value) => {
        this.setState({
            buttonDisabled: value
        })
    }

    goBackward = () => {
        this.tabs.goBackward()
    }
    goForward = () => {
        this.tabs.goForward()
    }

    getButton = () => {
        if (this.state.currentPage == this.state.steps) {
            return null;
        }
        return (
                <Button primary rounded style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                    <Text style={Ui.buttonLabel}>{I18n.t('continue')}</Text>
                </Button>
        )

    }

    getHeader = () => {

        if (this.state.currentPage == 0 || this.state.currentPage == this.state.steps || this.state.depositCompleted == 'error' || this.state.depositCompleted == 'cancel') {
            return <Header
                title={I18n.t('withdraw')}
            />
        }
        return <Header
            title={I18n.t('withdraw')}
            onBack={this.goBackward}
        />
    }

    getOpenedRequests = () => {
        if(this.state.openedRequests) {
            return <View style={styles.openedRequestsContainer}>
                <Text style={styles.openedRequestsLabel}>{I18n.t('openedWithdrawRequests')}</Text>
                <Text style={styles.openedRequestsCount}>{this.state.openedRequests}</Text>
            </View>
        }
        return null;
    }

    changeHandler = (page) => {
        this.setState({
            currentPage: page
        });
    }

    render() {
        return (
            <Container style={Ui.container}>
                {this.getHeader()}
                <Content >
                    <View style={Ui.cardContainer}>
                        <View style={{flex:1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={this.state.steps} labels={labels}></Steps>
                            {this.getOpenedRequests()}
                            <View style={Ui.formContainer}>
                                <WithdrawSteps currentPage={this.state.currentPage} onRef={ref => (this.tabs = ref)} {...this.props}
                                               onUpdatePage={this.changeHandler}
                                               disableButton={this.setButtonState}></WithdrawSteps>
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

export default Withdraw;
