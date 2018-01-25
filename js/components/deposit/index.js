import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import DepositSteps from './depositsteps';
import {
    Container,
    Card,
    CardItem,
    Header,
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

import styles from "./styles";

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

    getChat = () => {
        if (this.state.currentPage == this.state.steps - 1 || this.state.currentPage == this.state.steps) {
            return null;
        }
        return (
            <Chat></Chat>
        )
    }

    getRightHeader = () => {
        if (this.state.currentPage == 0 || this.state.currentPage == this.state.steps) {
            return null;
        }
        return (
            <Button transparent small onPress={() => this.props.navigation.navigate("MyAccount")}>
                <Text style={{textAlign: 'right'}}>{I18n.t('cancel')}</Text>
            </Button>
        )
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
                <View style={[styles.withdrawHeader, styles.centered]}>
                    {/*<Icon active name='ios-close-circle' style={styles.errorIcon}/>*/}
                    <MaterialIcons name="error" size={30} style={styles.errorIcon}></MaterialIcons>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{I18n.t('depositError')}</Text>
                </View>

                <Text style={styles.confirmationText}>
                    {I18n.t('depositErrorMessage')}
                </Text>

            </View>
        }
        if (this.state.depositCompleted == 'cancel') {
            return <View>
                <View style={[styles.withdrawHeader, styles.centered]}>
                    <MaterialCommunityIcons name="cancel" size={30} style={styles.cancelIcon}></MaterialCommunityIcons>
                    <Text style={{textAlign: 'center', fontSize: 20}}>{I18n.t('depositCancel')}</Text>
                </View>

                <Text style={styles.confirmationText}>
                    {I18n.t('depositCancelMessage')}
                </Text>

            </View>
        }
        return null;
    }

    getButton = () => {
        if (this.state.depositCompleted == 'success') {
            return <Button block style={styles.continueButton}
                           onPress={() => this.props.navigation.navigate("FundsTransfer", {
                               paymentData: this.state.paymentData,
                           })}>
                <Text style={styles.continueButtonLabel}>{I18n.t('fundsTransfer')}</Text>
            </Button>
        }

        if (this.state.depositCompleted == 'error' || this.state.depositCompleted == 'cancel') {
            return <View>
                <Button block style={styles.continueButton} onPress={() => this.resetDeposit()}>
                    <Text style={styles.continueButtonLabel}>{I18n.t('startOver')}</Text>
                </Button>
            </View>


        }

        if (this.state.currentPage == this.state.steps - 1) {
            return null;
        }
        return (
            <Button block style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                <Text style={styles.continueButtonLabel}>{I18n.t('continue')}</Text>
            </Button>
        )
    }

    getBackButton = () => {

        if (this.state.currentPage == 0 || this.state.currentPage == this.state.steps || this.state.depositCompleted == 'error' || this.state.depositCompleted == 'cancel') {
            return ( <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                    <Icon name="ios-menu"/>
                </Button>
            )
        }
        return (<Button transparent onPress={this.goBackward}>
            <Icon name="arrow-back"/>
        </Button>)
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
            return [styles.cardContainer, styles.webViewOpened]
        }
        return styles.cardContainer
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header hasTabs>
                    <Left>
                        {this.getBackButton()}
                    </Left>
                    <Body>
                    <Title>{I18n.t('deposit')}</Title>
                    </Body>
                    <Right>
                        {this.getRightHeader()}
                    </Right>
                </Header>
                <Content>
                    <Card style={this.getStyle()}>
                        <View style={{flex: 1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={this.state.steps}
                                   labels={this.state.labels}></Steps>
                            <View style={styles.formContainer}>
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
                                <View style={styles.buttonsContainer}>
                                    {this.getButton()}
                                    {this.getChat()}
                                </View>
                            </View>
                        </View>
                    </Card>
                    {this.getWebView()}
                </Content>

            </Container>
        );
    }
}

export default Deposit;
