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
import Header from '../../common/header/header';

import {View} from 'react-native';

import styles from "./styles";
const Item = Picker.Item;

import Ui from '../../common/ui';

class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            steps:3,
            buttonDisabled: false,
            paymentData: {},
            labels:[I18n.t('accounts'), I18n.t('notes'), I18n.t('transfer')],
            loaded:false
        }
    }

    componentDidMount = () => {
        const {state} = this.props.navigation;
        if(state.params && state.params.paymentData){
            this.setState({
                paymentData: state.params.paymentData,
                loaded:true
            })
        }else{
            this.setState({
                loaded:true
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
        if (this.state.currentPage === this.state.steps) {
            return null;
        }
        if(this.state.currentPage === this.state.steps - 2) {
            return <Button primary rounded style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                <Text style={Ui.buttonLabel}>{I18n.t('transfer').toUpperCase()}</Text>
            </Button>
        }

        return <Button primary rounded style={styles.continueButton} onPress={this.goForward} disabled={this.state.buttonDisabled}>
                    <Text style={Ui.buttonLabel}>{I18n.t('continue').toUpperCase()}</Text>
                </Button>

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
        if(page > 0){
            Chat.hide()
        }
    };

    hideChat = () => {
        Chat.hide()
    }
    getFundsTransferSteps = () => {
        if(!this.state.loaded) return null
        return <FundsTransferSteps currentPage={this.state.currentPage} onRef={ref => (this.tabs = ref)} {...this.props}
                                   setPage={this.setPage}
                                   hideChat={this.hideChat}
                                   paymentData={this.state.paymentData}
                                   disableButton={this.setButtonState}/>
    }
    render() {
        return (
            <Container style={Ui.container}>

                {this.getHeader()}
                <Content >
                    <View style={Ui.cardContainer}>
                        <View style={{flex:1}}>
                            <Steps currentPage={this.state.currentPage} stepCount={this.state.steps} labels={this.state.labels}/>

                            <View style={Ui.formContainer}>
                                {this.getFundsTransferSteps()}
                                <View style={Ui.buttonsContainer}>
                                    <Chat/>
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
