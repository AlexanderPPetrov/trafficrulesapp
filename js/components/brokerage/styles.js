const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../../common/colorscheme";
export default {

    betLabel: {
        justifyContent: 'flex-start',
        textAlign:'left',
        alignSelf: "stretch"
    },

    betValue: {
        justifyContent: 'flex-end',
        textAlign:'right',
        alignSelf: "stretch"
    },

    betId: {
        fontSize:13
    },

    selectionContainer: {
        marginLeft:15,
        marginRight:15,
        paddingTop:3,
        paddingBottom:3
    },

    selectionLabel: {
        paddingRight:10,
        fontSize:18,
        color: ColorScheme.darker,
        fontFamily:'Roboto_medium'
    },

    odds: {
        paddingTop:3,
        backgroundColor: ColorScheme.neutralLight,
        color: ColorScheme.darkest,
        fontFamily:'Roboto_light'
    },

    matchContainer: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:5,
        paddingBottom:10
    },

    infoContainer: {
        paddingLeft:15,
        paddingRight:15,
        marginBottom:15
    },

    statusLabel: {
        backgroundColor: ColorScheme.info,
        color: ColorScheme.neutralLight,
        alignSelf: 'flex-end',
        fontSize:12,
        paddingTop:2,
        paddingBottom:2,
        paddingLeft:5,
        paddingRight:5
    },

    eventLabel: {
        color: ColorScheme.darker,
        fontSize: 14,
        fontFamily:'Roboto_light'
    },

    stakeLabel: {
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        fontSize:14,
        paddingTop:2,
        paddingRight:5
    },
    dateLabel: {
        color: ColorScheme.dark,
        fontSize: 14,
        fontFamily:'Roboto_light'
    }
};