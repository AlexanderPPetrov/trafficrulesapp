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
import {View} from "react-native"
import Ui from '../../common/ui';
import ColorScheme from '../../common/colorscheme';
import {normalize} from "../ui";

class AmountTable extends Component {

    render() {
        return <View style={{paddingTop: 45, paddingBottom: 45, paddingLeft:25, paddingRight:25}}>
            <Grid style={{padding:15, borderColor:ColorScheme.listItemBorderColor, borderWidth:1}}>
                <Row >
                    <Col>
                        <Text style={Ui.itemLabelLight}>{I18n.t('amount')}</Text>
                    </Col>
                    <Col>
                        <Text style={[Ui.itemLabelDark,{textAlign:'right'}]}>{this.props.amount} {this.props.currency}</Text>
                    </Col>
                </Row>
                <Row style={{marginTop:15}}>
                    <Col>
                        <Text style={Ui.itemLabelLight}>{I18n.t('fee')}</Text>
                    </Col>
                    <Col>
                        <Text style={[Ui.itemLabelDark, {textAlign:'right'}]}>{this.props.fee} {this.props.currency}</Text>
                    </Col>
                </Row>
            </Grid>
              <View style={[Ui.listItem, Ui.listHeader, {justifyContent:'center',alignItems:'center', borderRightWidth:1, borderRightColor:ColorScheme.listItemBorderColor, borderLeftWidth:1, borderLeftColor: ColorScheme.listItemBorderColor}]}>
                  <Text style={[Ui.itemLabelDark, {fontSize:normalize(20)}]}>{this.props.netAmount} {this.props.currency}</Text>
              </View>
        </View>
    }
}

export default AmountTable;
