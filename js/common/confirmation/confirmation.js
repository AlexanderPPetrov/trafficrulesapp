import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
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
import {Grid, Row, Col} from "react-native-easy-grid";
import {View} from 'react-native';
import Ui from '../../common/ui';

class Confirmation extends Component {

    getStatusHeader = () => {
        if(this.props.status == 'success'){
            return <View style={[Ui.confirmationHeader, Ui.centered]}>
                <Icon active name='ios-checkmark-circle-outline' style={Ui.successIcon}/>
                <Text style={[Ui.confirmMessage, Ui.textWin]}>{this.props.statusMessage}</Text>
            </View>
        }

        if (this.props.status == 'error') {
            return <View style={[Ui.confirmationHeader, Ui.centered]}>
                <MaterialIcons name="error" style={Ui.errorIcon}></MaterialIcons>
                <Text style={[Ui.confirmMessage, Ui.textLoss]}>{this.props.statusMessage}</Text>
            </View>
        }
        if (this.props.status == 'cancel') {
            return <View style={[Ui.confirmationHeader, Ui.centered]}>
                <MaterialCommunityIcons name="cancel" style={Ui.cancelIcon}></MaterialCommunityIcons>
                <Text style={[Ui.confirmMessage, Ui.textDraw]}>{this.props.statusMessage}</Text>
            </View>
        }
    }

    getResult = () => {
        if(this.props.amount) {
            return <View>
                <Text>{I18n.t('amount')} {this.props.amount} {this.props.currency}</Text>
                <Text>{I18n.t('fee')} {this.props.fee} {this.props.currency}</Text>
                <Text>{I18n.t('netAmount')} {this.props.netAmount} {this.props.currency}</Text>
            </View>
        }
        return null;
    }

    getAdditionalText = () => {
        if(this.props.additionalText){
            return <Text style={Ui.confirmationText}>
                {this.props.additionalText}
            </Text>
        }
        return null
    }

    render() {
        return <View style={{alignItems: 'flex-start', alignSelf:'center', flex:1, flexDirection:'column'}}>
            <View style={{}}>

                {this.getStatusHeader()}
                {this.getResult()}
                <Text style={Ui.confirmationText}>
                    {this.props.description}
                </Text>
                {this.getAdditionalText()}
            </View>
        </View>
    }
}

export default Confirmation;
