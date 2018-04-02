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
import ColorScheme from '../../common/colorscheme';
import CommonPicker from '../../common/picker/picker';
import Header from '../../common/header/header';
import styles from "./styles";
import Controller from "../../../Controller";
import Api from "../../../Api";
import Expo from 'expo';


const Item = Picker.Item;
const switches = ['withdraw_and_deposit', 'funds_transfer', 'weekly_status', 'brokerage_activity', 'betting_tips', 'ad_hoc_messages']

class Settings extends Component {

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
            if(!languageCode){
                languageCode = 'en'
            }else{
                languageCode = languageCode.split('-')[0].split('_')[0];
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

    changeLanguage = async (value) => {
        this.setState({
            languageCode: value
        });

        Controller.updateSideBar(value)
        await this.loadTranslations(value)

        AsyncStorage.setItem('locale', value);

        Api.post({
            url: 'set-member-language',
            success: (response)=> console.log('language changed to', response._language),
            data: {language: I18n.locale}
        })
    };

    loadTranslations = async (value) => {

        try {
            let response = await fetch(
                'https://api.premiumtradings.com/translations/locales/' + value + '.json'
            );
            let responseJson = await response.json();
            I18n.translations[value] = responseJson;
            I18n.locale = value;

        } catch (error) {
            I18n.locale = 'back';
            console.log(error)
        }
    };

    logOut = () => {
        this.deleteSecureItem('pin');
        this.deleteSecureItem('fingerPrint');
        this.deleteSecureItem('password');
    };

    deleteSecureItem = (key) => {

        Expo.SecureStore.deleteItemAsync(key)
            .then((value) => {
                this.setState({
                    [key]: value
                }, () => {
                    if(key === 'password'){
                        Controller.navigateTo('Landing')
                    }
                })
            })
            .catch((error) => {
                this.errorMessage(error)
            })
    };

    getLanguagePicker = () => {

        if(!this.state.languageLoaded) return null;
        let listItems = []
        for(let [key, value] of Object.entries(I18n.availableLocales)){
            listItems.push(<Item key={key} value={key} label={value}></Item>)
        }
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
                    <List style={{backgroundColor:'#fff'}}>
                        <ListItem style={[Ui.listItem,Ui.listHeader]}>
                            <Text>{I18n.t('language')}</Text>
                        </ListItem>
                        <ListItem style={{height:76}}>
                            <Col>
                                {this.getLanguagePicker()}
                            </Col>
                        </ListItem>
                        <ListItem style={[Ui.listItem,Ui.listHeader]}>
                            <Text>{I18n.t('notifications')}</Text>
                        </ListItem>
                        {this.getSwitches()}
                        <ListItem button noBorder style={{borderBottomColor:ColorScheme.listItemBorderColor, borderBottomWidth:1}} onPress={() => this.logOut() }>
                            <Left >
                                <Icon active name={'ios-log-out-outline'} style={ {color: ColorScheme.dark, fontSize: 26, width: 25}}/>
                                <Text style={styles.text}>
                                    {I18n.t('logOut')}
                                </Text>
                            </Left>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default Settings;
