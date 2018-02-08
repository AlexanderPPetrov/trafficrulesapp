const React = require("react-native");
import ColorScheme from "../../common/colorscheme";

const {StyleSheet, Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {

    withdrawHeader: {
        flex:1,
        marginBottom:15,
        alignSelf:'stretch'
    },

    webview: {
        width: deviceWidth,
        height:deviceHeight
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


    inputSecureId: {
        marginTop:15,
        marginBottom:30
    },

};
