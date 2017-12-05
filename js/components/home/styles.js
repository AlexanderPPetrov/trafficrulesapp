const React = require("react-native");

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    loginContainer: {
        backgroundColor: '#fce0d4'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputField: {
        backgroundColor:'#ffffff',
        marginRight:15
    },
    formContainer: {
        flex: 1,
        margin: 15,
        marginTop: deviceHeight / 8,
        marginBottom: 30
    },
    logo: {
        // position: "absolute",
        // left: Platform.OS === "android" ? 40 : 50,
        // top: Platform.OS === "android" ? 35 : 60,
        // width: 247,
        // height: 67
        marginTop:30
    },
    helloMessage: {
        fontSize:20,
        fontWeight:'bold',
        marginBottom:30
    },

    avatar: {
        width:85,
        height:85,
        marginTop:15,
        marginBottom:15
    },

    loginButton:{
        margin: 15,
        marginTop: 45
    }
};
