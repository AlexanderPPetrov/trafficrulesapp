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
import {Grid, Row, Col} from "react-native-easy-grid";
import Ui from '../../common/ui';
import ColorScheme from '../../common/colorscheme';
import styles from "./styles";
import Api from "../../../Api";


class BetDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid style={{borderBottomWidth:1, borderBottomColor: ColorScheme.listItemBorderColor}}>
                <Col>
                    <Row style={{marginBottom:5}}>
                        <Text style={[Ui.cardHeader, styles.betId]}>{I18n.t('betNumber')} {this.props.bet._id}</Text>
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
                            <Text style={[styles.betValue, styles.dateLabel]}>{this.props.bet._event_date.split(' ')[0]}</Text>
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
                            <Text style={styles.statusLabel}>{I18n.t('running').toUpperCase()}</Text>
                        </Col>
                    </Row>
                </Col>
            </Grid>
        );
    }
}

export default BetDetails;
