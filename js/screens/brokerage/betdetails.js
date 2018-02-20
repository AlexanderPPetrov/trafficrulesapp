import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card, CardItem, List, ListItem, Separator,
    Left,
    Right,
    Body
} from "native-base";

import {View} from 'react-native';
import {Grid, Row, Col} from "react-native-easy-grid";
import Ui from '../../common/ui';
import ColorScheme from '../../common/colorscheme';
import styles from "./styles";
import Api from "../../../Api";


const statuses = ['running','win','halfWin','draw','halfLoss','loss','cancelled']

class BetDetails extends Component {

    constructor(props) {
        super(props);

    }

    getStatusLabel = () => {
        if(this.props.bet){
            let status = statuses[this.props.bet._status]

            if(!status) status = 'running';
            let labelStyles = [Ui.statusContainer, Ui[status]];
            console.log(status);

            return <View style={labelStyles}>
                <Text style={Ui.statusLabel}>{I18n.t(status).toUpperCase()}</Text>
            </View>
        }
        return null;
    }

    getProfitStyle = (profit) => {
        if(!profit) return
        let style = Ui.textWin;
        if(parseFloat(profit) < 0){
            style = Ui.textLoss
        }
        if(parseFloat(profit) == 0){
            style = Ui.textDraw
        }
        return style
    }

    getBetProfit = () => {
        if(!this.props.bet._profit) return null
        return <Text style={[styles.profit, Ui.balanceValue, Ui.profitValue, Ui.bold, this.getProfitStyle(this.props.bet._profit)]}>{this.props.bet._profit} {this.props.bet._currency}</Text>
    }
    getDate = () => {
        if(this.props.getHoursOnly){
            return <Text style={[Ui.cardHeader, styles.dateLabel]}>{this.props.bet._event_date.split(' ')[1]}</Text>
        }
        return <Text style={[Ui.cardHeader, styles.dateLabel]}>{this.props.bet._event_date.split(' ')[0]}</Text>

    }

    render() {
        return (
            <Grid style={{borderBottomWidth:1, borderBottomColor: ColorScheme.listItemBorderColor}}>
                <Col>
                    <Row style={{marginBottom:5}}>
                        <Col>
                            <Text style={[Ui.cardHeader, styles.betId]}>{I18n.t('betNumber')} {this.props.bet._id}</Text>
                        </Col>
                        <Col>
                            {this.getDate()}
                        </Col>
                    </Row>
                    <Row style={styles.selectionContainer}>
                        <Col size={3}>
                            <Text style={[styles.betLabel, styles.selectionLabel]}>{this.props.bet._selection}</Text>
                        </Col>
                        <Col size={2} >
                            <Row style={{justifyContent: 'flex-end'}}>
                                <Text style={[styles.betValue, styles.selectionLabel]}>{this.props.bet._score}</Text>
                                <Text style={styles.odds}>@ {this.props.bet._odds}</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={styles.matchContainer}>
                        <Col size={3} >
                            <Text style={[styles.betLabel, styles.eventLabel]}>{this.props.bet._event}</Text>
                        </Col>
                        <Col size={2} >
                            {this.getBetProfit()}
                        </Col>
                    </Row>
                    <Row style={styles.infoContainer}>
                        <Col size={3} >
                            <Row>
                                <Text style={styles.stakeLabel}>{I18n.t('stake')}:</Text>
                                <Text style={styles.betLabel}>{this.props.bet._stake}</Text>
                                <Text style={styles.betLabel}>{this.props.bet._currency}</Text>
                            </Row>
                        </Col>
                        <Col size={2} >
                            {this.getStatusLabel()}
                        </Col>
                    </Row>
                </Col>
            </Grid>
        );
    }
}

export default BetDetails;
