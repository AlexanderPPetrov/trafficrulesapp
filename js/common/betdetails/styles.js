import {normalize} from "../../common/ui";

const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../../common/colorscheme";
export default {

    betLabel: {
        justifyContent: 'flex-start',
        textAlign:'left',
        alignSelf: "stretch",
        backgroundColor:'transparent',
        color:ColorScheme.darkest,
        fontSize:16
    },

    betValue: {
        justifyContent: 'flex-end',
        textAlign:'right',
        alignSelf: "stretch"
    },

    betId: {
        fontSize:13,
        backgroundColor:'transparent'
    },


    selectionContainer: {
        marginTop:15,
        marginBottom:5,
        marginLeft:15,
        marginRight:15,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#f3f3f3',
        borderRadius:15
    },

    selectionLabel: {
        paddingRight:10,
        fontSize:18,
        color: ColorScheme.darkest,
        fontFamily:'Roboto_light'
    },

    odds: {
        color: ColorScheme.darkest,
        fontFamily:'Roboto_medium'
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
        marginBottom:8,
        marginTop:5
    },



    settledBetStatus: {
        color: ColorScheme.neutralLight,
        alignSelf: 'flex-end',
        fontSize:12,
        paddingTop:2,
        paddingBottom:2,
        paddingLeft:5,
        paddingRight:5,
        minWidth:40,
        textAlign:'center'
    },

    eventLabel: {
        fontSize: 14,
        fontFamily:'Roboto_light'
    },

    stakeLabel: {
        color: ColorScheme.regular,
        fontFamily: 'Roboto_light',
        fontSize:14,
        lineHeight: 22,
        paddingRight:5,
        backgroundColor:'transparent'
    },
    dateLabel: {
        textAlign:'right',
        paddingRight:15,
        fontSize:normalize(12)
    },

    settledBetLabel: {
        fontSize:13,
        color: ColorScheme.light,
        fontFamily:'Roboto_light',
        marginBottom:10
    }


};