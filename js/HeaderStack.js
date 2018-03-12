import React from "react";
import {TabNavigator} from "react-navigation";
import {View} from "react-native";
import Header from './common/header/header';
import I18n from '../i18n/i18n';
import MyAccount from "./screens/myaccount/";
import Accounts from "./screens/accounts/";
import Brokerage from "./screens/brokerage/";
import Transactions from "./screens/transactions/";

const HeaderNavigator = (initialRouteName = 'MyAccount') => {

    const CustomNavigator = TabNavigator({
            MyAccount: {
                screen: MyAccount,
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarVisible: false
                }

            },
            Accounts: {
                screen: Accounts,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            Brokerage: {
                screen: Brokerage,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            Transactions: {
                screen: Transactions,
                navigationOptions: {
                    tabBarVisible: false
                }
            }
        },
        {
            initialRouteName: initialRouteName.initialRouteName,
            swipeEnabled: true,
            lazy:true

        });

    return <CustomNavigator />;
};


class HeaderStack extends React.Component {
    constructor(props)  {
        super(props);
    }
    render() {

        return (
            <View style={{flex:1}} key={this.props.navigation.state.key}>
                <Header
                    hasTabs
                    title={I18n.t(this.props.navigation.state.key)}
                    indicatorRoute={this.props.navigation.state.key}
                />
                <HeaderNavigator initialRouteName={this.props.navigation.state.routeName} />
            </View>
        );
    }
}

export default HeaderStack


