const React = require("react-native");

const {StyleSheet, Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

import ColorScheme from "../../common/colorscheme";
export default {
    container: {
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1000,
        left: 15,
        right: 15,
    },

    notification: {
        alignSelf:'stretch',
        flex:1,
        backgroundColor: "grey",
        borderRadius: 5,
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        elevation:1,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },

    notificationTitle: {
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.1)',
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5
    },

    notificationMessage: {
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        color: '#555'
    }
};