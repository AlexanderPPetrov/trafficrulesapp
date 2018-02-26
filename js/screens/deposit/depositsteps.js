import React, {Component} from 'react';
import { View, Text, AsyncStorage} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Api from "../../../Api";

import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Form,
    Item as FormItem,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,

} from "native-base";

import DepositMethod from './depositmethod'
import Account from "./account"
import Amount from '../../common/amount/amount'
import I18n from '../../../i18n/i18n'
import Ui from '../../common/ui'
import Confirmation from '../../common/confirmation/confirmation'

class DepositSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethod: '',
            account: '',
            amount: '',
            minAmount: 0,
            maxAmount: 0,
            notes: '',
            secureId:'',
            _payload:{}

        }
    }

    componentDidMount = async () => {
        this.props.onRef(this)
        try {
            let paymentMethod = await AsyncStorage.getItem('depositMethod');
            if (paymentMethod) {
                this.setPayment(paymentMethod)
            }
        } catch (error) {
            console.log(error)
        }
    }

    setPayment = (paymentMethod) => {
        this.setState({
            paymentMethod: paymentMethod._key,
            maxAmount: paymentMethod._max_amount,
            minAmount: paymentMethod._min_amount
        });

        if(paymentMethod._key == 'ECOPAYZ'){
            this.props.setPages(3)
        }else{
            this.props.setPages(4)
        }

        this.props.disableButton(false)
    }

    changeValue = (key, value) => {

        if (key == 'amount') {
            value = value.replace(/[^0-9.]/g, '')
            if (Number.parseFloat(value) < Number.parseFloat(this.state.minAmount)) {
                value = this.state.minAmount
            }
            if(this.state.maxAmount > this.state.minAmount){
                if(Number.parseFloat(value) > Number.parseFloat(this.state.maxAmount)){
                    value = this.state.maxAmount
                }
            }
        }

        if (key == 'secureId') {
            value = value.replace(/[^0-9]/g, '')
        }

        this.setState({
            [key]: value
        }, ()=> this.checkButton(key, value));

    }



    checkButton = (key, value) => {

        if(key == 'account'){
            if(value == '' || (this.state.secureId == '' && this.state.paymentMethod == 'NT')){
                this.props.disableButton(true)
            }else{
                this.props.disableButton(false)
            }
            return;
        }

        if(key == 'secureId'){
            if(value != '' && this.state.account != ''){
                this.props.disableButton(false)
            }else{
                this.props.disableButton(true)
            }
            return;
        }

        if (value != '') {
            this.props.disableButton(false)
        } else {
            this.props.disableButton(true)
        }
    }

    depositMoney = () => {
        let postData = {
            payment_method: this.state.paymentMethod,
            account: this.state.account,
            amount: this.state.amount,
            secure_id: this.state.secureId,
            response_url: 'http://api-prmts.dev.cc/v1/payment-response',
            success_url: 'https://mytest2.premiumtradings.com/#success',
            error_url: 'https://mytest2.premiumtradings.com/#error',
            fail_url: 'https://mytest2.premiumtradings.com/#error',
            cancel_url: 'https://mytest2.premiumtradings.com/#cancel'
        }
        // if(this.state.paymentMethod === 'MB_1TAP' && Api.accountSettings._skrill_1tap_token){
        //     postData.onetap_token = Api.accountSettings._skrill_1tap_token
        // }
        Api.post({
            url: 'deposit',
            data: postData,
            success: this.depositSuccess
        })
    }

    depositSuccess = async (response) => {
        this.setState({
            _payload: response
        })
            this.props.onUpdatePage(this.props.currentPage + 1)

        this.props.setPaymentData({
            payment_method: this.state.paymentMethod,
            account: this.state.account,
            amount:this.state.amount,
            payment_id: response._payment_num
        });

        try {
            await AsyncStorage.setItem('depositMethod', this.state.paymentMethod);
        } catch (error) {
            console.log(error)
        }

        if(response._status == 'confirmed'){
            this.props.setDepositCompleted('success')
            this.props.onUpdatePage(this.props.currentPage + 1)
        }



        this.refs.view.fadeInRight(300);
        if(response._redirect_url){
            this.props.setRedirectUrl(response._redirect_url)
        }


    }

    renderStep = () => {

        let currentStep = this.props.stepsNames[this.props.currentPage]
        console.log(currentStep, this.props.currentPage)

        if (currentStep == 'method') {
            return <DepositMethod setPayment={this.setPayment} disableButton={this.props.disableButton}
                                  paymentMethod={this.state.paymentMethod}/>
        }
        if (currentStep == 'account') {
            return <Account onValueChange={this.changeValue} disableButton={this.props.disableButton} paymentMethod={this.state.paymentMethod}
                            account={this.state.account} secureId={this.state.secureId}/>
        }
        if (currentStep == 'amount') {
            return <View>
                    <Text style={Ui.stepHeader}>{I18n.t('depositAmount')}</Text>
                    <Amount label={I18n.t('enterDepositAmount')}
                            onValueChange={this.changeValue}
                            amount={this.state.amount} />
                </View>

        }
        if (currentStep == 'process') {

        }

        if (currentStep == 'deposit') {
            return <Confirmation
                        status={this.props.depositCompleted}
                        currency={this.state._payload._currency}
                        statusMessage={I18n.t('depositConfirmation')}
                        description={I18n.t('depositSuccess')}
                        additionalText={I18n.t('requestFundsTransfer')}
                        amount={this.state._payload._amount}
                        fee={this.state._payload._fee}
                        netAmount={this.state._payload._net_amount}
            />

        }
        return null;
    }

    goForward = () => {
        let currentStep = this.props.stepsNames[this.props.currentPage]
        if (currentStep == 'amount') {
            this.depositMoney()

        } else {
            this.props.onUpdatePage(this.props.currentPage + 1)
            this.refs.view.fadeInRight(300);
        }

    }
    goBackward = () => {
        this.props.onUpdatePage(this.props.currentPage - 1)
        this.refs.view.fadeInLeft(300);
    }

    render() {
        return (
            <Animatable.View ref="view" >
                {this.renderStep()}
            </Animatable.View>
        );
    }
}

export default DepositSteps;