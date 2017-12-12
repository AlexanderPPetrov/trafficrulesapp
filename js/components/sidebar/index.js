import React, {Component} from "react";
import {Image} from "react-native";

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

const drawerCover = require("../../../img/menu_cover.png");

const drawerImage = require("../../../img/menu_logo.png");

const datas = [
    {
        name: I18n.t('myAccount'),
        route: "MyAccount",
        icon: "ios-person",
        bg: "#C5F442"
    },
    {
        name: I18n.t('accounts'),
        route: "Accounts",
        icon: "ios-people",
        bg: "#C5F442",
    },
    {
        name: I18n.t('brokerage'),
        route: "Brokerage",
        icon: "ios-briefcase-outline",
        bg: "#477EEA",
    },
    {
        name: I18n.t('deposit'),
        route: "Deposit",
        icon: "ios-card",
        bg: "#DA4437",
    },
    {
        name: I18n.t('withdraw'),
        route: "WithdrawOne",
        icon: "ios-cash-outline",
        bg: "#4DCAE0",
    },
    {
        name: I18n.t('fundsTransfer'),
        route: "FundsTransfer",
        icon: "ios-swap",
        bg: "#1EBC7C",
    },
    {
        name: I18n.t('transactions'),
        route: "Transactions",
        icon: "ios-list-box-outline",
        bg: "#B89EF5",
    },
    {
        name: I18n.t('sendMoney'),
        route: "SendMoney",
        icon: "ios-share-alt-outline",
        bg: "#EB6B23",
    }
];


// {
//     name: I18n.t('transactions'),
//         route: "Transactions",
//     icon: "ios-list-box-outline",
//     bg: "#B89EF5",
//     types: "5",
// },

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
        };
    }

    iconStyle = (icon) => {
        console.log(icon)
        let marginLeft = 0,
            marginRight = 0
        if(icon == 'ios-person'){
            marginLeft = 4,
            marginRight = -4
        }
        return {
            color: "#777",
            fontSize: 26,
            width: 30,
            marginLeft: marginLeft,
            marginRight: marginRight
        }
    };

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                    <Image source={drawerCover} style={styles.drawerCover}>
                        <Image square style={styles.drawerImage} source={drawerImage}/>
                    </Image>
                    <List
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                                <Left>
                                    <Icon active name={data.icon} style={this.iconStyle(data.icon)}/>
                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                                {data.types &&
                                <Right style={{flex: 1}}>
                                    <Badge
                                        style={{
                                            borderRadius: 3,
                                            height: 25,
                                            width: 72,
                                            backgroundColor: data.bg,
                                        }}
                                    >
                                        <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                                    </Badge>
                                </Right>}
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}

export default SideBar;
