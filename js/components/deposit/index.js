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

import styles from "./styles";


const labels = [I18n.t('method'), I18n.t('account'), I18n.t('amount'), I18n.t('deposit')];

class Deposit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            buttonDisabled: true,
            depositCompleted:'',
            _redirect_url: '',
            payment_id:''
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

    setPaymentId = (value) => {
        this.setState({payment_id: value})
    }
    goBackward = () => {
        this.tabs.goBackward()
    }
    goForward = () => {
        this.tabs.goForward()
    }

    getChat = () => {
        if (this.state.currentPage == 4) {
            return null;
        }
        return (
            <Chat></Chat>
        )
    }

    getRightHeader = () => {
        if (this.state.currentPage == 0 || this.state.currentPage == 4) {
            return null;
        }
        return (
            <Button transparent small onPress={() => this.props.navigation.navigate("MyAccount")}>
                <Text style={{textAlign: 'right'}}>{I18n.t('cancel')}</Text>
            </Button>
        )
    }

    getButton = () => {
        if (this.state.depositCompleted == 'success') {
            return <Button style={styles.continueButton} onPress={() => this.props.navigation.navigate("FundsTransfer", {
                payment_id: this.state.payment_id,
            })} >
                <Text style={styles.continueButtonLabel}>{I18n.t('fundsTransfer')}</Text>
            </Button>
        }

        if(this.state.currentPage == 4){
            return null;
        }
        return (
            <Button style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                <Text style={styles.continueButtonLabel}>{I18n.t('continue')}</Text>
            </Button>
        )
    }

    getBackButton = () => {

        if (this.state.currentPage == 0 || this.state.currentPage == 4) {
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
    }

    setDepositCompleted = (value) => {
        this.setState({
            depositCompleted: value
        })
    }

    webViewChanged = (webViewState) => {

        if(webViewState.url.indexOf('#success') != -1){
            let params  = this.getUrlParameters(webViewState.url);
            console.log(params)
            this.setDepositCompleted('success')
            this.setRedirectUrl('')
        }
        if(webViewState.url.indexOf('#error') != -1){
            let params  = this.getUrlParameters(webViewState.url);
            console.log(params)
            this.setDepositCompleted('error')
            this.setRedirectUrl('')
        }
    }

    getUrlParameters = (url) => {

        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while(match = regex.exec(url)) {
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
        return null;
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
                    <Card style={styles.cardContainer}>
                        <View style={{flex: 1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={4} labels={labels}></Steps>
                            {this.getChat()}
                            <View style={styles.formContainer}>
                                <DepositSteps currentPage={this.state.currentPage}
                                              onRef={ref => (this.tabs = ref)} {...this.props}
                                              onUpdatePage={this.changeHandler}
                                              setRedirectUrl={this.setRedirectUrl}
                                              setPaymentId={this.setPaymentId}
                                              setDepositCompleted={this.setDepositCompleted}
                                              depositCompleted={this.state.depositCompleted}
                                              disableButton={this.setButtonState}></DepositSteps>
                                {this.getButton()}
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
