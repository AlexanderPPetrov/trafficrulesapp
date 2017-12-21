const React = require("react-native");
import ColorScheme from "./colorscheme";

const {StyleSheet} = React;

export default {
    listHeader: {
        backgroundColor: ColorScheme.neutralLight,
        height:45,
        justifyContent: 'center',
        paddingLeft:15,
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker
    },
    listHeaderExtended: {
        backgroundColor: ColorScheme.neutralLight,
        height:50,
    },
    listHeaderLabel: {
        fontSize:12,
        color: ColorScheme.neutralDarkest,
    },

    listItem: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorScheme.neutralLight,
        flex: 1,
        flexDirection: 'row'
    },
    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch',
        fontSize:22,
        color:ColorScheme.dark
    },
    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        color: ColorScheme.light,
        paddingTop:4,
        paddingLeft:5,
        fontSize:12
    }
};