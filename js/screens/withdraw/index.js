import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import WithdrawSteps from './withdrawsteps';
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
import Controller from '../../../Controller';

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
            buttonDisabled: true,
            openedRequests: 0
        }
    }

    componentDidMount = () => {
        Api.get({
            url:'get-member-pending-withdraw-requests-count',
            success: this.setOpenedRequests
        })
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

    getChat = () => {
        if (this.state.currentPage == 5) {
            return null;
        }
        return (
            <Chat></Chat>
        )
    }

    getRightHeader = () => {
        if (this.state.currentPage == 0 || this.state.currentPage == 5) {
            return null;
        }
        return (
            <Button transparent small onPress={() => Controller.navigateTo("MyAccount")}>
                <Text style={{textAlign: 'right'}}>{I18n.t('cancel')}</Text>
            </Button>
        )
    }

    getButton = () => {
        if (this.state.currentPage == 5) {
            return null;
        }
        return (
                <Button style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                    <Text style={styles.continueButtonLabel}>{I18n.t('continue')}</Text>
                </Button>
        )
    }

    getBackButton = () => {

        if (this.state.currentPage == 0 || this.state.currentPage == 5) {
            return ( <Button transparent onPress={() => Controller.navigateTo("DrawerOpen")}>
                    <Icon name="ios-menu"/>
                </Button>
            )
        }
        return (<Button transparent onPress={this.goBackward}>
            <Icon name="arrow-back"/>
        </Button>)
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
                <Header hasTabs>
                    <Left>
                        {this.getBackButton()}
                    </Left>
                    <Body>
                    <Title>{I18n.t('withdraw')}</Title>
                    </Body>
                    <Right>
                        {this.getRightHeader()}
                    </Right>
                </Header>
                <Content >
                    <Card style={Ui.cardContainer}>
                        {this.getOpenedRequests()}
                        <View style={{flex:1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={5} labels={labels}></Steps>

                            <View style={Ui.formContainer}>
                                <WithdrawSteps currentPage={this.state.currentPage} onRef={ref => (this.tabs = ref)} {...this.props}
                                               onUpdatePage={this.changeHandler}
                                               disableButton={this.setButtonState}></WithdrawSteps>
                                <View style={Ui.buttonsContainer}>
                                    {this.getButton()}
                                    {this.getChat()}
                                </View>
                            </View>
                        </View>
                    </Card>

                </Content>

            </Container>
        );
    }
}

export default Withdraw;
