import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import DepositSteps from './depositsteps';
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

import {View, ScrollView, WebView} from 'react-native';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import Ui from '../../common/ui';
import Header from '../../common/header/header';

import styles from "./styles";
import Controller from '../../../Controller';

class Deposit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            buttonDisabled: true,
            depositCompleted: '',
            _redirect_url: '',
            steps: 4,
            paymentData: {},
            labels: [I18n.t('method'), I18n.t('account'), I18n.t('amount'), I18n.t('deposit')],
            stepsNames: ['method', 'account', 'amount', 'process', 'deposit']
        }
    }

    setRedirectUrl = (value) => {
        this.setState({_redirect_url: value})
    }

    setButtonState = (value) => {
        this.setState({
            buttonDisabled: value
        })
    }

    setPages = (number) => {
        let labels = [I18n.t('method'), I18n.t('account'), I18n.t('amount'), I18n.t('deposit')],
            stepsNames = ['method', 'account', 'amount', 'process', 'deposit'];
        if (number == 3) {
            labels = [I18n.t('method'), I18n.t('amount'), I18n.t('deposit')];
            stepsNames = ['method', 'amount', 'process', 'deposit'];
        }
        this.setState({steps: number, labels: labels, stepsNames: stepsNames})
        console.log('steps ', number)
    }

    setPaymentData = (value) => {
        this.setState({paymentData: value})
    }

    goBackward = () => {
        this.tabs.goBackward()
        this.setState({
            _redirect_url:'',
            depositCompleted:''
        })
    }

    goForward = () => {
        this.tabs.goForward()
    }

    getHeader = () => {

        if (this.state.currentPage == 0 || this.state.currentPage == this.state.steps || this.state.depositCompleted == 'error' || this.state.depositCompleted == 'cancel') {
            return <Header
                title={I18n.t('deposit')}
            />
        }
        return <Header
                title={I18n.t('deposit')}
                onBack={this.goBackward}
        />
    }

    resetDeposit = () => {
        this.setState({
            currentPage: 0,
            depositCompleted: '',
            _redirect_url: '',
            paymentData: {}
        })
    }

    getErrorMessage = () => {
        if (this.state.depositCompleted == 'error') {
            return <View>
                <View style={[Ui.confirmationHeader, Ui.centered]}>
                    {/*<Icon active name='ios-close-circle' style={styles.errorIcon}/>*/}
                    <MaterialIcons name="error" size={30} style={styles.errorIcon}></MaterialIcons>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{I18n.t('depositError')}</Text>
                </View>

                <Text style={Ui.confirmationText}>
                    {I18n.t('depositErrorMessage')}
                </Text>

            </View>
        }
        if (this.state.depositCompleted == 'cancel') {
            return <View>
                <View style={[Ui.confirmationHeader, Ui.centered]}>
                    <MaterialCommunityIcons name="cancel" size={30} style={styles.cancelIcon}></MaterialCommunityIcons>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{I18n.t('depositCancel')}</Text>
                </View>

                <Text style={Ui.confirmationText}>
                    {I18n.t('depositCancelMessage')}
                </Text>

            </View>
        }
        return null;
    }

    getButton = () => {
        if (this.state.depositCompleted == 'success') {
            return <Button primary rounded style={styles.continueButton}
                           onPress={() => Controller.navigateTo("FundsTransfer", {
                               paymentData: this.state.paymentData,
                           })}>
                <Text style={Ui.buttonLabel}>{I18n.t('fundsTransfer')}</Text>
            </Button>
        }

        if (this.state.depositCompleted == 'error' || this.state.depositCompleted == 'cancel') {
            return <View>
                <Button primary rounded style={styles.continueButton} onPress={() => this.resetDeposit()}>
                    <Text style={Ui.buttonLabel}>{I18n.t('startOver')}</Text>
                </Button>
            </View>

        }

        if (this.state.currentPage == this.state.steps - 1) {
            return null;
        }
        return (
            <Button primary rounded style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                <Text style={Ui.buttonLabel}>{I18n.t('continue')}</Text>
            </Button>
        )
    }


    changeHandler = (page) => {
        this.setState({
            currentPage: page
        });
        console.log(page, this.state.steps)
    }


    setDepositCompleted = (value) => {
        this.setState({
            depositCompleted: value
        })
    }

    webViewChanged = (webViewState) => {
        console.log(webViewState)

        if (webViewState.url.indexOf('#success') != -1) {
            let params = this.getUrlParameters(webViewState.url);
            console.log(params)
            this.setDepositCompleted('success')
            this.setState({
                currentPage: this.state.steps
            })
            this.setRedirectUrl('')
        }
        if (webViewState.url.indexOf('#error') != -1) {
            let params = this.getUrlParameters(webViewState.url);
            console.log(params)
            this.setDepositCompleted('error')
            this.setRedirectUrl('')
        }

        if (webViewState.url.indexOf('#cancel') != -1) {
            let params = this.getUrlParameters(webViewState.url);
            console.log(params)
            this.setDepositCompleted('cancel')
            this.setRedirectUrl('')
        }
    }

    getUrlParameters = (url) => {

        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }
        return params;
    }

    getWebView = () => {
        if (this.state._redirect_url != '') {
            return <WebView
                style={styles.webview}
                source={{uri: this.state._redirect_url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                onNavigationStateChange={this.webViewChanged}
            >
            </WebView>
        }
        return null
    }

    getStyle = () => {
        if(this.state._redirect_url != ''){
            return [Ui.cardContainer, styles.webViewOpened]
        }
        return Ui.cardContainer
    }
    render() {
        return (
            <Container style={Ui.container}>
                {this.getHeader()}
                <Content>
                    <View style={this.getStyle()}>
                        <Steps currentPage={this.state.currentPage} stepCount={this.state.steps}
                               labels={this.state.labels}></Steps>
                        <View style={Ui.formContainer}>
                            <DepositSteps currentPage={this.state.currentPage}
                                          onRef={ref => (this.tabs = ref)} {...this.props}
                                          onUpdatePage={this.changeHandler}
                                          setRedirectUrl={this.setRedirectUrl}
                                          setPaymentData={this.setPaymentData}
                                          setDepositCompleted={this.setDepositCompleted}
                                          depositCompleted={this.state.depositCompleted}
                                          setPages={this.setPages}
                                          stepsNames={this.state.stepsNames}
                                          disableButton={this.setButtonState}></DepositSteps>
                            {this.getErrorMessage()}
                            <View style={Ui.buttonsContainer}>
                                {this.getButton()}
                            </View>
                        </View>
                    </View>
                    {this.getWebView()}
                </Content>

            </Container>
        );
    }
}

export default Deposit;
