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
    Picker,
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

const Item = Picker.Item;

import styles from "./styles";
import Api from "../../../Api";
import { NavigationActions } from 'react-navigation'

const languages = [{
    code:'en',
    label:'English'
},{
    code: 'fr',
    label:'Français'
}];

const switches = ['notificationsWithdrawDeposit', 'notificationsFundsTransfer', 'notificationsWeeklyStatus', 'notificationsBrokerageActivity', 'notificationsBettingTips', 'notificationsAdHocMessages']

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageCode: 'en',
            language: 'English',
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

    setNotification = (switchKey, value) => {
        this.setState({
            [switchKey]:value
        })
    };

    loadLanguage = () => {

    };

    getSwitches = () => {
        const switchList = switches.map((switchKey, i) => {
            return <ListItem key={i} style={Ui.listItem}>
                <Col size={3}>
                <Text style={Ui.itemLabel}>{I18n.t(switchKey)}</Text>
                </Col>
                <Col size={1} >
                <Switch style={{alignSelf:'flex-end'}} value={this.state[switchKey]}
                            onValueChange={(value)=>this.setNotification(switchKey, value)}/>
                </Col>
            </ListItem>
        });

        return <List>
            {switchList}
        </List>
    };

    changeLanguage = (value) => {
        this.setState({
            languageCode: value
        });

        I18n.locale = value
        Api.updateSideBar(value)
    };

    getLanguagePicker = () => {
        const listItems = languages.map((language, i) =>
            <Item key={i} value={language.code} label={language.label}></Item>
        );
        return  <Picker
            mode="dropdown"
            placeholder={I18n.t('language')}
            iosHeader=" "
            selectedValue={this.state.languageCode}
            onValueChange={(value) =>
                this.changeLanguage(value)
            }
            note={false}
            renderHeader={backAction =>
                <Header >
                    <Left>
                        <Button transparent onPress={backAction}>
                            <Icon name="arrow-back"  />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>

                    </Body>
                    <Right />
                </Header>}
        >
            {listItems}

        </Picker>
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
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>{I18n.t('language')}</Text>
                        </ListItem>
                        <ListItem style={Ui.listItem}>
                            <Col>
                                {this.getLanguagePicker()}
                            </Col>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>{I18n.t('notifications')}</Text>
                        </ListItem>
                        {this.getSwitches()}
                    </List>
                </Content>
            </Container>

        );
    }
}

export default Transactions;
