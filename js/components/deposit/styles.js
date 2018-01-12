const React = require("react-native");
import ColorScheme from "../../common/colorscheme";

const {StyleSheet, Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    stepsContainer: {
        backgroundColor: ColorScheme.neutralLight,
        padding:15
    },
    withdrawHeader: {
        flex:1,
        marginBottom:15,
        alignSelf:'stretch'
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
    errorIcon: {
        color:ColorScheme.loss,
        fontSize:45,
        marginBottom:10
    },
    cancelIcon: {
        color:ColorScheme.neutralDarkest,
        fontSize:45,
        marginBottom:10
    },
    formContainer: {
        flex:1,
        justifyContent: 'space-between'
    },
    form: {
        // borderBottomWidth: 1,
        // borderColor: ColorScheme.neutralDark,
        minHeight:50,
        padding:0
    },
    webview: {
        width: deviceWidth,
        height:deviceHeight
    },

    formLabel:{
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom:10,
        fontSize: 14
    },

    stepHeader: {
        textAlign:'center',
        fontSize:18,
        padding:10,
        paddingBottom:45,
        color:ColorScheme.darkest
    },
    cardContainer:{
        padding:30,
        paddingTop:15,
        paddingBottom:30,
        width:deviceWidth - 6,
        minHeight:deviceHeight - 92,
        // minHeight:deviceHeight - 90,
        alignSelf:'stretch',
        opacity:1
    },

    webViewOpened: {
        opacity:0,
        height:0,
        minHeight:0,
        padding:0,
        paddingTop:0,
        paddingBottom:0,
        marginTop:0,
        marginBottom:0
    },

    buttonsContainer: {
        alignSelf:'flex-end',
        justifyContent: 'space-between',
        width:'100%'
    },
    chatButton: {
    },

    continueButton:{

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
    inputSecureId: {
        marginTop:15,
        marginBottom:30
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
