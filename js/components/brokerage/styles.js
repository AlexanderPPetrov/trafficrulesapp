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
        color: ColorScheme.darkest,
        paddingLeft:5
    },

    selectionContainer: {
        marginLeft:15,
        marginRight:15,
        borderColor: ColorScheme.neutralDarker,
        backgroundColor: ColorScheme.neutralDark,
        borderWidth: 1,
        height:45,
        padding:10
    },

    matchContainer: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10
    },

    infoContainer: {
        paddingLeft:15,
        paddingRight:15
    },

    statusLabel: {
        backgroundColor: ColorScheme.info,
        color: ColorScheme.neutralLight,
        alignSelf: 'flex-end',
        fontSize:12,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15
    },

    eventLabel: {
        color: ColorScheme.darker,
        fontSize: 16,
        fontFamily:'Roboto_light'
    },

    dateLabel: {
        color: ColorScheme.dark,
        fontSize: 14,
        fontFamily:'Roboto_light'
    }
};