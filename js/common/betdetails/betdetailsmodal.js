import React, {Component} from "react";

import {View, Dimensions, ScrollView, Modal, SafeAreaView} from 'react-native';
import I18n from '../../../i18n/i18n';
import {
    Container,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    CardItem
} from "native-base";
import Header from '../../common/header/header';
import Ui from '../ui';
import ColorScheme from '../colorscheme';
import Api from '../../../Api';
import {Grid, Row, Col} from "react-native-easy-grid";

import BetDetails from "./betdetails";

const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');

let modalInstance = null;

class BetDetailsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            date:'',
            loaded:false,
            settledBetsDetails:[]
        };

        modalInstance = this;
    }

    static show = (date) => {
        if(modalInstance) modalInstance.showModal(true, date)
    };

    static hide = () => {
        if(modalInstance) modalInstance.showModal(false)
    };

    showModal = (modalVisible, date) => {
        this.loadSettledBetsData(date);
        this.setState({
            modalVisible,
            loaded:false
        })
    };

    closeModal = () => {
        this.showModal(false)
    }

    loadSettledBetsData = (date) => {
        Api.get({
            url: 'get-brokerage-daily-balances',
            success: this.settledBetsLoaded,
            data: {
                date_to: date,
                date_from: date,
            }
        })
        this.setState({
            date
        })
    };

    settledBetsLoaded = (response) => {
        this.setState({
            settledBetsDetails: response.bets,
            loaded:true
        })
    };

    getBets = () => {
        if (this.state.settledBetsDetails.length == 0 && this.state.loaded ) {
            return <Text style={Ui.noResults}>{I18n.t('noSettledBets')}</Text>;
        }
        const betDetails = this.state.settledBetsDetails.map((bet, i) => {
            bet._event_date = bet._date;
            return <BetDetails bet={bet} key={i} getHoursOnly={true}/>
        });
        return betDetails
    }
    getBetsDetails = () => {

        return (
            <View style={{backgroundColor:ColorScheme.listItemBackground}}>
                <View style={Ui.listItem}>
                    <Col>
                        <Text style={Ui.itemLabel}>{I18n.t('betDetailsFor')}</Text>
                    </Col>
                    <Col >
                        <Text style={[Ui.balanceValue, Ui.profitValue, Ui.bold]}>{this.state.date.split(' ')[0]}</Text>
                    </Col>
                </View>
                {this.getBets()}
            </View>
        );
    }

    render() {
        if(!this.state.modalVisible) return null;

        return <View><Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >
            <SafeAreaView style={{flex: 1, backgroundColor: ColorScheme.headerBackground}}>
                <Header
                    onBack={this.closeModal}
                    title={I18n.t('settledBets')}
                    cancel={false}
                />

                <ScrollView style={{backgroundColor:ColorScheme.mainBackground}}>
                    {this.getBetsDetails()}
                </ScrollView>
            </SafeAreaView>
            </Modal>
        </View>

    }
}

export default BetDetailsModal;
