import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
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
import {Grid, Row, Col} from "react-native-easy-grid";
import Ui from '../../common/ui';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class Confirmation extends Component {

    render() {
        return (

            <View >
                <View style={[Ui.confirmationHeader, Ui.centered]} >
                    <Icon active name='ios-checkmark-circle' style={Ui.successIcon}/>
                    <Text style={{textAlign:'center', fontSize:20}}>{I18n.t('withdrawConfirmation')}</Text>
                </View>
                <Grid>
                    <Row style={{marginBottom:15}}>
                        <Col>
                            <Text>{I18n.t('withdrawStatus')}</Text>
                        </Col>
                        <Col >
                            <Text style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                textAlign:'right',
                            }}>{I18n.t(this.props.status)}</Text>
                        </Col>
                    </Row>
                </Grid>
                <Text style={Ui.confirmationText}>
                    {I18n.t('withdrawSuccess')}
                </Text>
                {/*<Text style={Ui.confirmationText}>*/}
                    {/*{I18n.t('withdrawSuccessTwo')}*/}
                {/*</Text>*/}

            </View>

        );
    }
}

export default Confirmation;
