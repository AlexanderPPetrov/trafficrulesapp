const React = require("react-native");

const {StyleSheet} = React;

import ColorScheme from "../../common/colorscheme";
import Ui from '../../common/ui';

export default {

    cardBody: {
        flexDirection: 'row',
        flex: 1,
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
