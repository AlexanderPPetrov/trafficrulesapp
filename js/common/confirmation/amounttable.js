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
        return <Grid style={{paddingTop: 45, paddingBottom: 45, paddingLeft:25, paddingRight:25}}>
                <Row >
                    <Col>
                        <Text style={[{fontSize:normalize(13)}]}>{I18n.t('amount')}</Text>
                    </Col>
                    <Col>
                        <Text style={[{fontSize: normalize(16), textAlign:'right'}]}>{this.props.amount} {this.props.currency}</Text>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Text style={[Ui.itemLabelLight, {fontSize:normalize(13)}]}>{I18n.t('fee')}</Text>
                    </Col>
                    <Col>
                        <Text style={[Ui.itemLabelLight, {fontSize: normalize(14), textAlign:'right'}]}>{this.props.fee} {this.props.currency}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={[Ui.itemLabelDark, {fontSize:normalize(13)}]}>{I18n.t('netAmount')}</Text>
                    </Col>
                    <Col>
                        <Text style={[Ui.itemLabelDark, {fontSize:normalize(16), textAlign:'right'}]}>{this.props.netAmount} {this.props.currency}</Text>
                    </Col>
                </Row>
        </Grid>
    }
}

export default AmountTable;
