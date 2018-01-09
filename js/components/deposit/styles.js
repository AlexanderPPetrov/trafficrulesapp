const React = require("react-native");
import ColorScheme from "../../common/colorscheme";

const {StyleSheet} = React;

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
    formContainer: {
        padding:20,
        flex:1,
        justifyContent: 'space-between'
    },
    form: {
        // borderBottomWidth: 1,
        // borderColor: ColorScheme.neutralDark,
        // minHeight:50,
        // padding:0
    },


    formLabel:{
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom:10,
        fontSize: 14
    },
    cardContainer:{
        padding:15,
        minHeight:300
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
    inputField: {
        flex:1,
        fontSize:18,
        lineHeight: 24,
        color:ColorScheme.darkest
    },
    amountInput: {
        textAlign:'right',
        fontSize:36
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker,
        marginLeft:0,
        minHeight:50
    },
    amountCurrency: {
        fontFamily:'Roboto_light',
        color: ColorScheme.darker,
        fontSize:20,
        paddingTop:8,
        lineHeight:20,
        marginLeft:10
    },
    confirmationText: {
        fontFamily:'Roboto_light',
        fontSize:16,
        color: ColorScheme.light,
        textAlign:'center',
        marginTop:15
    }
};
