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
    formContainer: {
        borderWidth: 1,
        borderColor: ColorScheme.neutralDark,
        padding:0
    },
    formLabel:{
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom:10,
        fontSize: 14
    },
    cardContainer:{
        padding:35,
        minHeight:250,
        flex:1.5
    },
    continueButtonContainer: {
        flex:1,
        justifyContent:'flex-end',
    },
    continueButton: {
        position:'absolute',
        bottom:35,
        left:35,
        width:'100%'
    },
    continueButtonLabel: {
        textAlign:'center',
        flex:1
    },

    inputField: {
        flex:1,
        borderBottomWidth: 0,
        fontSize:18,
        lineHeight: 24,
        color:ColorScheme.darkest
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: ColorScheme.neutralDark,
        marginLeft:0
    }

};
