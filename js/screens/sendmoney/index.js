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
import {Grid, Row, Col} from "react-native-easy-grid";

import {View, ScrollView} from 'react-native';
import Ui from '../../common/ui';
import styles from "./styles";
import Api from "../../../Api";
import Chat from '../../common/chat/index';

const Item = Picker.Item;

class SendMoney extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            steps:4,
            buttonDisabled: true,
            loaded: false,
            isAllowed:false,
            labels:[I18n.t('account'), I18n.t('yourSecureId'), I18n.t('confirmation'), I18n.t('sendMoney')]
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
            loaded: true,
            isAllowed:response._is_allowed
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
        console.log('££££££££3', this.state.currentPage, this.state.steps)
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
        // if(page === this.state.steps){
        //     Chat.hide()
        // }else{
        //     Chat.show()
        // }
    };

    getSteps = () => {
        if(!this.state.loaded || this.state.isAllowed) return null
        return <Steps currentPage={this.state.currentPage} stepCount={this.state.steps} labels={this.state.labels}/>

    }

    getSendMoney = () => {
        if(!this.state.loaded) return null

        if(!this.state.isAllowed){
            return <View style={Ui.formContainer}>
                <SendMoneySteps currentPage={this.state.currentPage}
                                onRef={ref => (this.tabs = ref)} {...this.props}
                                setPage={this.setPage}
                                disableButton={this.setButtonState}/>

                <View style={Ui.buttonsContainer}>
                    {this.getButton()}
                </View>
            </View>
        }

        return <View style={[Ui.formContainer, {justifyContent: 'flex-start'}]}>
                    <Text style={Ui.stepHeader}>{I18n.t('transferFundsPro')}</Text>
                    <Text> {I18n.t('transferFundsProDescription')}</Text>
                    <Text> {I18n.t('transferFundsProDescriptionTwo')}</Text>
                    <Text> {I18n.t('transferFundsProDescriptionThree')}</Text>
                    <Text> {I18n.t('transferFundsProDescriptionFour')}</Text>

        </View>
    }

    getChat = () => {
        if(this.state.loaded && this.state.isAllowed) {
            return <Chat/>
        }
    }

    render() {
        return (
            <Container style={Ui.container}>
                {this.getHeader()}
                <Content>
                    <View style={Ui.cardContainer}>
                        <View style={{flex: 1}}>
                            {this.getSteps()}
                                {this.getSendMoney()}

                        </View>
                    </View>
                </Content>

                {this.getChat()}

            </Container>
        );
    }
}

export default SendMoney;
