import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import FundsTransferSteps from './fundstransfersteps';
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

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

const labels = [I18n.t('existing'), I18n.t('new'), I18n.t('notes'), I18n.t('transfer')];

class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            buttonDisabled: false
        }
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
        if (this.state.currentPage == 5) {
            return null;
        }
        return (
            <Button transparent small onPress={() => this.props.navigation.navigate("MyAccount")}>
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

    render() {
        return (
            <Container style={styles.container}>
                <Header hasTabs>
                    <Left>
                        {this.getBackButton()}
                    </Left>
                    <Body>
                    <Title>{I18n.t('fundsTransfer')}</Title>
                    </Body>
                    <Right>
                        {this.getRightHeader()}
                    </Right>
                </Header>

                <Content >
                    <Card style={styles.cardContainer}>
                        <View style={{flex:1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={4} labels={labels}></Steps>

                            <View style={styles.formContainer}>
                                <FundsTransferSteps currentPage={this.state.currentPage} onRef={ref => (this.tabs = ref)} {...this.props}
                                               onUpdatePage={this.changeHandler}
                                               disableButton={this.setButtonState}></FundsTransferSteps>
                                <View style={styles.buttonsContainer}>
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
