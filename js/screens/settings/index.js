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
import {AsyncStorage} from "react-native";
import Ui from '../../common/ui';

const Item = Picker.Item;

import styles from "./styles";
import Controller from "../../../Controller";

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
        this.loadSettings();
    };

    loadSettings = () => {
        AsyncStorage.multiGet(switches, (err, stores) => {
            stores.map((result, i, store) => {
                let key = store[i][0];
                let value = store[i][1];

                if(value == null || value == 'true'){
                    value = true;
                }else{
                    value = false
                }
                this.setState({
                    [key]:value
                })
            });
        });

        AsyncStorage.getItem('locale', (err, result) => {
            this.setState({
                languageCode:result
            });
        });
    };

    setNotification = (switchKey, value) => {
        this.setState({
            [switchKey]:value
        });
        AsyncStorage.setItem(switchKey, value.toString());
    };

    getSwitchLabelStyle = (switchKey) => {
        let notificationLabel = [Ui.itemLabel];
        if(this.state[switchKey] == false){
            notificationLabel = [Ui.itemLabel, styles.notificationOff]
        }
        return notificationLabel
    };

    getSwitches = () => {
        const switchList = switches.map((switchKey, i) => {
            return <ListItem key={i} style={Ui.listItem}>
                <Col size={3}>
                <Text style={this.getSwitchLabelStyle(switchKey)}>{I18n.t(switchKey)}</Text>
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

        I18n.locale = value;
        Controller.updateSideBar(value)
        AsyncStorage.setItem('locale', value);

    };

    getLanguagePicker = () => {
        const listItems = languages.map((language, i) =>
            <Item key={i} value={language.code} label={language.label}></Item>
        );
        return  <Picker
            mode="dropdown"
            placeholder=""
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
