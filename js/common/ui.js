const React = require("react-native");
import ColorScheme from "./colorscheme";

const {StyleSheet} = React;

export default {
    listHeader: {
        backgroundColor: ColorScheme.neutralDark,
        height:45,
        justifyContent: 'center',
        paddingLeft:15,
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker
    },
    listHeaderExtended: {
        backgroundColor: ColorScheme.neutralDark                                                                                                                                                           ,
        height:50,
    },
    listHeaderLabel: {
        fontSize:14,
        color: ColorScheme.neutralDarkest,
    },
    listItem: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorScheme.neutralLight,
        flex: 1,
        flexDirection: 'row',
        maxHeight:78
    },
    balanceLabel: {
        color: ColorScheme.darker,
        fontSize: 16
    },
    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch',
        fontSize:20,
        color:ColorScheme.light
    },
    balanceValueSmall: {
        fontSize:16,
    },
    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        color: ColorScheme.light,
        paddingTop:4,
        paddingLeft:5,
        fontSize:12
    },
    currencyWidth: {
        width:30
    }
};