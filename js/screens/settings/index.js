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
    Card, CardItem, List, ListItem,
    Left,
    Right,
    Body,
    Switch
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {View, FlatList, RefreshControl} from "react-native";
import Ui from '../../common/ui';

import styles from "./styles";
import Api from "../../../Api";

//  default: return 'Cash Deposit';

const switches = ['notificationsWithdrawDeposit', 'notificationsFundsTransfer', 'notificationsWeeklyStatus', 'notificationsBrokerageActivity', 'notificationsBettingTips', 'notificationsAdHocMessages']

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'EN',
            notificationsWithdrawDeposit: true,
            notificationsFundsTransfer: true,
            notificationsWeeklyStatus: true,
            notificationsBrokerageActivity: true,
            notificationsBettingTips: true,
            notificationsAdHocMessages: true
        }
    }

    componentDidMount = () => {
        this.loadLanguage();
    };

    loadLanguage = () => {

    };

    getSwitches = () => {
        const switchList = switches.map((switchKey, i) => {
            return <ListItem icon key={i}>
                <Left>
                    <Icon name="plane" />
                </Left>
                <Body>
                <Text>{I18n.t(switchKey)}</Text>
                </Body>
                <Right>
                    <Switch value={this.state[switchKey]}
                            onValueChange={(value)=>this.setState({
                                [switchKey]:value
                            })}/>
                </Right>
            </ListItem>
        });

        return <List>
            {switchList}
        </List>
    }

    render() {
        return (
            <Container style={Ui.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('settings')}</Title>
                    </Body>
                    <Right/>
                </Header>
                <List>

                    {this.getSwitches()}
                </List>
            </Container>

        );
    }
}

export default Transactions;
