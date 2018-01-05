const React = require("react-native");

const {StyleSheet} = React;

import ColorScheme from "../../common/colorscheme";

export default {

    mainBalanceContainer: {
        flex: 1
    },
    cardBody: {
        flexDirection: 'row',
        flex: 1,
    },

    mainBalanceValue: {
        color: ColorScheme.darkest,
        fontSize: 26,
        textAlign: 'right',
        fontFamily: 'Roboto_light',
        flex: 1,
        paddingLeft:15
    },
    mainBalanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily:'Roboto_light',
        color: ColorScheme.darker,
        paddingTop:4,
        paddingLeft:5,
        fontSize:15,
        paddingRight:15
    },
    mainBalance: {
        flex: 1,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    balancesContainer: {
        paddingBottom: 100
    },

    balanceView: {
        borderBottomColor: ColorScheme.neutralLight,
        borderBottomWidth: 1
    },

    balanceHeader: {
        padding: 15,
        color: ColorScheme.light,
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDark
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        backgroundColor: ColorScheme.neutralLight,
        borderRadius: 42
    },

    pieChartContainer: {
        backgroundColor: ColorScheme.neutralLight
    },
    BTC: {
        backgroundColor:ColorScheme.BTC
    },
    USD: {
        backgroundColor:ColorScheme.USD
    },
    GBP: {
        backgroundColor:ColorScheme.GBP
    },
    EUR: {
        backgroundColor:ColorScheme.EUR
    },
    P: {
        backgroundColor:ColorScheme.P
    },
    INR: {
        backgroundColor:ColorScheme.INR
    },
};
