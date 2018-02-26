import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Form,
    Picker,
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
import Ui from '../../common/ui';
import ColorScheme from '../../common/colorscheme';
import {normalize} from "../ui";

class AmountTable extends Component {

    render() {
        return <Grid style={{paddingTop: 45, paddingBottom: 45}}>
            <Col>
                <Row style={Ui.centered}>
                    <Text style={[Ui.textCenter, Ui.itemLabelLight, {fontSize:normalize(13)}]}>{I18n.t('amount')}</Text>
                </Row>
                <Row style={Ui.centered}>
                    <Text style={[Ui.textCenter, Ui.itemLabelDark, {fontSize: normalize(18)}]}>{this.props.amount}</Text>
                    <Text style={[Ui.mainBalanceCurrency, Ui.itemLabelDark]}>{this.props.currency}</Text>
                </Row>
            </Col>
            <Col style={{marginLeft:10, marginRight:10, height: 25, marginTop:10, width: 1, backgroundColor: ColorScheme.listItemBorderColor}}></Col>
            <Col>
                <Row style={Ui.centered}>
                    <Text style={[Ui.textCenter, Ui.itemLabelLight, {fontSize:normalize(13)}]}>{I18n.t('fee')}</Text>
                </Row>
                <Row style={Ui.centered}>
                    <Text style={[Ui.textCenter, Ui.itemLabelDark, {fontSize: normalize(18)}]}>{this.props.fee}</Text>
                    <Text style={[Ui.mainBalanceCurrency, Ui.itemLabelDark]}>{this.props.currency}</Text>
                </Row>
            </Col>
            <Col style={{marginLeft:10, marginRight:10, height: 25, marginTop:10, width: 1, backgroundColor: ColorScheme.listItemBorderColor}}></Col>
            <Col>
                <Row style={Ui.centered}>
                    <Text style={[Ui.textCenter, Ui.itemLabelLight, {fontSize:normalize(13)}]}>{I18n.t('netAmount')}</Text>
                </Row>
                <Row style={Ui.centered}>
                    <Text style={[Ui.textCenter, Ui.itemLabelDark, Ui.bold, {fontSize: normalize(18)}]}>{this.props.netAmount}</Text>
                    <Text style={[Ui.mainBalanceCurrency, Ui.itemLabelDark]}>{this.props.currency}</Text>
                </Row>
            </Col>
        </Grid>
    }
}

export default AmountTable;
