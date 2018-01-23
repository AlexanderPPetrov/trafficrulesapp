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


const datas = [
    {
        name: I18n.t('myAccount'),
        route: "MyAccount",
        icon: "ios-person"
    },
    {
        name: I18n.t('accounts'),
        route: "Accounts",
        icon: "ios-people"
    },
    {
        name: I18n.t('brokerage'),
        route: "Brokerage",
        icon: "ios-briefcase-outline",
    },
    {
        name: I18n.t('deposit'),
        route: "Deposit",
        icon: "ios-card",
    },
    {
        name: I18n.t('withdraw'),
        route: "Withdraw",
        icon: "ios-cash-outline",
    },
    {
        name: I18n.t('fundsTransfer'),
        route: "FundsTransfer",
        icon: "ios-swap",
    },
    {
        name: I18n.t('transactions'),
        route: "Transactions",
        icon: "ios-list-box-outline",
    },
    {
        name: I18n.t('sendMoney'),
        route: "SendMoney",
        icon: "ios-share-alt-outline",
    },
    {
        name: I18n.t('logOut'),
        route: "SendMoney",
        icon: "ios-log-out-outline",
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
            scale:scale
        };
    }

    iconStyle = (icon) => {
        console.log(icon)
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

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, top: -1}}>

                    <View style={styles.menuHeader}>
                        <Logo scale={this.state.scale} primary={ColorScheme.neutralLight} secondary={ColorScheme.action} slogan={ColorScheme.neutralLight}>
                        </Logo>
                    </View>

                    <List style={{paddingTop:15}}
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                                <Left style={{paddingLeft: 10}}>
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
