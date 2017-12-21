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

    balanceLabel: {
        color: ColorScheme.darker,
        fontSize: 16
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

    iconContainer: {

        borderWidth: 1,
        borderColor: ColorScheme.dark,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: ColorScheme.neutralLight,
        borderRadius: 50

    },



};
