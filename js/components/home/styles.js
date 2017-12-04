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
        backgroundColor:'#ffffff'
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 8,
        marginBottom: 30
    },
    logo: {
        // position: "absolute",
        // left: Platform.OS === "android" ? 40 : 50,
        // top: Platform.OS === "android" ? 35 : 60,
        // width: 247,
        // height: 67
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    loginButton:{
        margin: 15,
        marginTop: 50
    }
};
