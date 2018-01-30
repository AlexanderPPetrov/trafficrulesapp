import React, {Component} from "react";
import {Dimensions} from "react-native";
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

import styles from "./style";
import I18n from '../../../i18n/i18n';
import Logo from '../../common/logo/logo';
import ColorScheme from "../../common/colorscheme";

const menuData = [
    {
        name: 'myAccount',
        route: "MyAccount",
        icon: "ios-person"
    },
    {
        name: 'accounts',
        route: "Accounts",
        icon: "ios-people"
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
        icon: "ios-share-alt-outline",
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

        let scale = (width - 120) / 500;
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            scale:scale,
            language:'en',
            translatedLabels:[]
        };
    }

    changeLanguage = (language) => {
        this.setState({
            language
        })
    }
    iconStyle = (icon) => {
        let marginLeft = 0,
            marginRight = 0
        if (icon == 'ios-person') {
            marginLeft = 4,
                marginRight = -4
        }
        return {
            color: ColorScheme.dark,
            fontSize: 26,
            width: 30,
            marginLeft: marginLeft,
            marginRight: marginRight
        }
    };

    getMenuItems = () => {

        const menuItems = menuData.map((item, i) => {
            return <ListItem key={i} button noBorder onPress={() => this.props.navigation.navigate(item.route)}>
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

                    <View style={styles.menuHeader}>
                        <Logo scale={this.state.scale} primary={ColorScheme.neutralLight} secondary={ColorScheme.action} slogan={ColorScheme.neutralLight}>
                        </Logo>
                    </View>
                    <List style={{paddingTop:15}}>
                        {this.getMenuItems()}
                    </List>
                </Content>
            </Container>
        );
    }
}

export default SideBar;
