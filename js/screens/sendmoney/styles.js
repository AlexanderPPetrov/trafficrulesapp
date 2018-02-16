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
    currencyPicker: {
        width:120
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
    formLabel:{
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom:10,
        fontSize: 14
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

    accountsList: {
        paddingTop:15,
        paddingBottom:15
    },

    accountInList: {
        marginTop:3,
        borderWidth: 1,
        borderColor: ColorScheme.neutralDarker,
    },

    accountLabel: {

    },
    addAccountButton: {
        paddingLeft:5,
        paddingRight:5
    },
    addAccountIcon: {
        fontSize:42
    },
    accountAmount: {

    },
    removeAccountButton: {
        paddingLeft:5,
        paddingRight:5
    },
    removeAccountIcon: {
        fontSize:26
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
        textAlign:'center'
    }
};
