const React = require("react-native");
import ColorScheme from "../../common/colorscheme";

const {StyleSheet} = React;

export default {

    balanceLabel: {

    },

    secondaryLabel: {
        color:ColorScheme.dark
    },

    balanceRed: {
        color:'#f22f31'
    },
    balanceGreen: {
        color:'#0caf43'
    },

    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch'
    },

    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'stretch',
        color:ColorScheme.light,
        paddingLeft:5
    },
    legendLabel: {
        color: ColorScheme.light,
        fontSize: 14,
        fontFamily:'Roboto_light'
    }

};
