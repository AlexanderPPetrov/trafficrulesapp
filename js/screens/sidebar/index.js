import React, {Component} from "react";
import {Dimensions, Image} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button,
    View,
    StyleProvider,
    getTheme,
    variables,
} from "native-base";
import Controller from '../../../Controller';

import styles from "./style";
import I18n from '../../../i18n/i18n';
import Logo from '../../common/logo/logo';
import ColorScheme from "../../common/colorscheme";

const menuData = [
    {
        name: 'myAccount',
        route: "MyAccount",
        icon: "ios-person-outline"
    },
    {
        name: 'accounts',
        route: "Accounts",
        icon: "ios-people-outline"
    },
    {
        name: 'brokerage',
        route: "Brokerage",
        icon: "ios-briefcase-outline",
    },
    {
        name: 'deposit',
        route: "Deposit",
        icon: "ios-card",
    },
    {
        name: 'withdraw',
        route: "Withdraw",
        icon: "ios-cash-outline",
    },
    {
        name: 'fundsTransfer',
        route: "FundsTransfer",
        icon: "ios-swap",
    },
    {
        name: 'transactions',
        route: "Transactions",
        icon: "ios-list-box-outline",
    },
    {
        name: 'sendMoney',
        route: "SendMoney",
        icon: "ios-send-outline",
    },
    {
        name: 'settings',
        route: "Settings",
        icon: "ios-settings-outline",
    }

];

class SideBar extends Component {
    constructor(props) {
        super(props);

        let {width, height} = Dimensions.get('window')

        let logoScale = (280 - 70) / 500;
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            logoScale,
            language:'en',
            translatedLabels:[]
        };
    }

    componentDidMount = () => {
        Controller.updateSideBar(I18n.locale)
    }

    changeLanguage = (language) => {
        this.setState({
            language
        })
    }
    iconStyle = (icon) => {
        let marginLeft = 0,
            marginRight = 0,
            fontSize = 26;
        if (icon == 'ios-person-outline') {
            marginLeft = 4,
                marginRight = -4
        }
        if (icon == 'ios-send-outline') {
            fontSize = 30
            marginRight = 1
        }
        return {
            color: ColorScheme.dark,
            fontSize,
            width: 30,
            marginLeft,
            marginRight
        }
    };

    getMenuItems = () => {

        const menuItems = menuData.map((item, i) => {
            return <ListItem key={i} button noBorder onPress={() => Controller.navigateTo(item.route)}>
                <Left style={{paddingLeft: 10}}>
                    <Icon active name={item.icon} style={this.iconStyle(item.icon)}/>
                    <Text style={styles.text}>
                        {I18n.t(item.name, {locale: this.state.language})}
                    </Text>
                </Left>
            </ListItem>
        });

        return menuItems
    };

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, top: -1}}>
                    <Image style={{width:280, height:197.12, position:'absolute', top:60}}
                        source={require('../../../img/menu_background.png')}
                    />

                    <View style={styles.menuHeader}>
                        <Logo scale={this.state.logoScale} primary={ColorScheme.logoPrimary} secondary={ColorScheme.logoSecondary} slogan={ColorScheme.neutralLight} />
                    </View>
                    <List style={{paddingTop:40}}>
                        {this.getMenuItems()}
                    </List>
                </Content>
            </Container>
        );
    }
}

export default SideBar;
