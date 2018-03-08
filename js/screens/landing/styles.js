const React = require("react-native");

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get("window").height;

import ColorScheme from "../../common/colorscheme";


export default {
    loginContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:ColorScheme.mainBackground
    },
    imageContainer: {

    },


    inputIcon: {
        color: ColorScheme.neutralDark,
        opacity:0.8,
        fontSize:30,
        width:30
    },

    inputIconUser:{

    },

    inputField: {
        flex:1,
        borderBottomWidth: 0,
        // fontSize:18,
        // lineHeight: 24
    },
    formContainer: {
        marginTop:45,
        alignSelf: "stretch"
    },

    helloMessage: {
        fontSize:20,
        fontWeight:'bold',
        marginBottom:30,
        color:ColorScheme.neutralLight
    },

    avatar: {
        marginTop:15,
        marginBottom:5,
        color:ColorScheme.neutralDark
    },

    loginButton:{
        marginTop: 30,
        alignSelf:'stretch'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
};
