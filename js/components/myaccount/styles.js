const React = require("react-native");

const {StyleSheet} = React;

import ColorScheme from "../../common/colorscheme";

export default {
    balancePadding: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    mainBalanceContainer: {
        backgroundColor: ColorScheme.neutralLight,
    },

    cardHeader: {
        paddingLeft: 10,
        paddingTop: 5
    },
    cardBody: {
        flexDirection: 'row',
        flex: 1,
    },
    moneyInAccounts: {
        color: ColorScheme.light,
        fontSize: 14
    },
    mainBalanceLabel: {
        color: ColorScheme.neutralLight,
    },
    mainBalanceValue: {
        color: ColorScheme.neutralLight,
        fontWeight: 'bold',
        fontSize: 22
    },
    mainBalance: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        flexDirection: 'row',
    },
    safeBalance: {
        backgroundColor: ColorScheme.info,
    },
    brokerageBalance: {
        backgroundColor: ColorScheme.primary
    },

    balancesContainer: {
        paddingBottom: 100
    },

    balanceView: {
        borderBottomColor: ColorScheme.neutralLight,
        borderBottomWidth: 1
    },

    balanceHeader: {
        padding:15,
        color: ColorScheme.light,
        fontSize: 12,
        borderBottomWidth:1,
        borderBottomColor:ColorScheme.neutralDark
    },

    listItem: {
        flex: 1,
        flexDirection: 'row',
    },

    balanceItem: {
        backgroundColor: 'green',
        flex: 6,
        flexDirection: 'row'
    },

    iconContainer: {

        borderWidth: 1,
        borderColor: ColorScheme.dark,
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: 46,
        backgroundColor: ColorScheme.neutralLight,
        borderRadius: 46,
        marginRight: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,

    },

    balanceLabel: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 7,
        paddingBottom: 7
    },

    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch'
    },

    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'stretch',
        color: ColorScheme.dark,
        paddingLeft: 5
    }


};
