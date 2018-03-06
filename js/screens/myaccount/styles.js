const React = require("react-native");

const {StyleSheet} = React;

import ColorScheme from "../../common/colorscheme";

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



    pieChartContainer: {
        backgroundColor: ColorScheme.neutralLight
    }

};
