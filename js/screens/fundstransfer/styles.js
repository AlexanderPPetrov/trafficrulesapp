import {normalize} from "../../common/ui";

const React = require("react-native");
import ColorScheme from "../../common/colorscheme";

const {StyleSheet, Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    stepsContainer: {
        backgroundColor: ColorScheme.neutralLight,
        minHeight: 300,
        padding:15
    },
    withdrawHeader: {
        flex:1,
        marginBottom:15
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    successIcon: {
        color:ColorScheme.win,
        fontSize:45,
        marginBottom:10
    },

    continueButtonContainer: {
        alignSelf:'flex-end'
    },
    continueButton: {

    },
    chatButton: {
        marginTop:15,
        alignSelf:'center'
    },

    continueButtonLabel: {
        textAlign:'center',
        flex:1
    },

    amountInput: {
        textAlign:'right',
        fontSize:36
    },

    accountsList: {
        marginTop:30,
        borderTopColor: ColorScheme.listItemBorderColor,
        borderTopWidth:1,
        marginBottom:15
    },

    accountInList: {
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor: ColorScheme.listItemBorderColor,
        borderBottomWidth:1
    },

    accountLabel: {
        fontSize: normalize(14),
        color:ColorScheme.darkest
    },
    addAccountButton: {
        paddingLeft:5,
        paddingRight:5
    },
    addAccountIcon: {
        fontSize:normalize(26),
        color:ColorScheme.darkest,
        textAlign:'center'
    },
    addMoreLabel: {
        fontSize:normalize(14),
        color:ColorScheme.darkest
    },
    accountAmount: {
        fontSize: normalize(14),
        color:ColorScheme.darkest
    },
    removeAccountButton: {
        paddingLeft:5,
        paddingRight:5
    },
    removeAccountIcon: {
        fontSize:24,
        color:ColorScheme.loss
    },

    confirmationText: {
        fontFamily:'Roboto_light',
        fontSize:16,
        color: ColorScheme.light,
        textAlign:'center'
    }
};
