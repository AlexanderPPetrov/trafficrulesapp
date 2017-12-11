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

    inputContainer: {
        backgroundColor:'#ffffff',
        marginRight:15
    },

    inputField: {
        flex:1,
        borderWidth: 0,
        fontSize:18,
        lineHeight: 24,
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
        marginTop:15,
        marginBottom:5,
        color:'#f36523'
    },

    loginButton:{
        margin: 15,
        marginTop: 45
    }
};
