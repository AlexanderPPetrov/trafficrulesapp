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


const statuses = ['running','win','halfWin','draw','halfLoss','loss','cancelled']



class BetDetails extends Component {

    constructor(props) {
        super(props);

    }

    getStatusLabel = () => {
        if(this.props.bet){
            console.log(this.props.bet._status)
            let status = statuses[this.props.bet._status]

            if(!status) status = 'running';
            let labelStyles = [styles.statusLabel, Ui[status]];
            console.log(status);

            return <Text style={labelStyles}>{I18n.t(status).toUpperCase()}</Text>
        }
        return null;
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
                            <Text style={[Ui.cardHeader, styles.dateLabel]}>{this.props.bet._event_date.split(' ')[0]}</Text>
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