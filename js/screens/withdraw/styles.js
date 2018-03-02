import {normalize} from "../../common/ui";

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
    openedRequestsContainer: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:2,
        paddingBottom:3,
        left:0,
        right:0,
        position:'absolute',
        top:0,
        backgroundColor:'rgba(255,153,0,0.2)',

    },
    openedRequestsLabel: {
        color:ColorScheme.dark,
        fontSize:normalize(11)
    },

    openedRequestsCount: {
        color:'#ff9900',
        textAlign: 'right',
        alignSelf: 'stretch',
        fontSize:normalize(11)
    },

    formLabel:{
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom:10,
        fontSize: 14
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

    confirmationText: {
        fontFamily:'Roboto_light',
        fontSize:16,
        color: ColorScheme.light,
        textAlign:'center'
    }
};
