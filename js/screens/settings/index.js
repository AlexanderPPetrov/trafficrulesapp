import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
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
import CommonPicker from '../../common/picker/picker';
import Header from '../../common/header/header';
import styles from "./styles";
import Controller from "../../../Controller";
import Api from "../../../Api";

const Item = Picker.Item;



const languages = [{
    code: 'en',
    label: 'English'
}, {
    code: 'fr',
    label: 'Français'
}];

const switches = ['withdraw_and_deposit', 'funds_transfer', 'weekly_status', 'brokerage_activity', 'betting_tips', 'ad_hoc_messages']

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageCode: 'en',
            language: 'English',
            withdraw_and_deposit: true,
            funds_transfer: true,
            weekly_status: true,
            brokerage_activity: true,
            betting_tips: true,
            ad_hoc_messages: true,
            languageLoaded: false
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

                if (value == null || value == 'true') {
                    value = true;
                } else {
                    value = false
                }
                this.setState({
                    [key]: value
                })
            });
        });

        AsyncStorage.getItem('locale', (err, result) => {
            let languageCode = result;
            if(!result){
                languageCode = I18n.locale
            }
            this.setState({
                languageCode
            }, () => {
                this.setState({
                    languageLoaded: true
                })
            });

        });
    };

    setNotification = (switchKey, value) => {
        this.setState({
            [switchKey]: value
        });
        AsyncStorage.setItem(switchKey, value.toString());

        let flag = 1;
        if(!value){
            flag = 0;
        }
        Api.post({
            url: 'set-member-device-notification-setting',
            success: (response)=> console.log('language changed to', response._language),
            data: {
                device_id: Api.deviceToken,
                value: flag,
                type:switchKey
            }
        })
    };

    getSwitchLabelStyle = (switchKey) => {
        let notificationLabel = [Ui.itemLabel];
        if (this.state[switchKey] == false) {
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
                <Col size={1}>
                    <Switch style={{alignSelf: 'flex-end'}} value={this.state[switchKey]}
                            onValueChange={(value) => this.setNotification(switchKey, value)}/>
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

        Api.post({
            url: 'set-member-language',
            success: (response)=> console.log('language changed to', response._language),
            data: {language: I18n.locale}
        })
    };

    getLanguagePicker = () => {
        if(!this.state.languageLoaded) return null;
        const listItems = languages.map((language, i) =>
            <Item key={i} value={language.code} label={language.label}></Item>
        );
        return <CommonPicker
            title={I18n.t('language')}
            selectedValue={this.state.languageCode}
            onValueChange={this.changeLanguage}
            listItems={listItems}
        />
    };

    render() {
        return (
            <Container style={Ui.container}>
                <Header
                    title={I18n.t('settings')}
                />
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
