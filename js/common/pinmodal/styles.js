import {normalize} from "../ui";

const React = require("react-native");
import { Constants} from 'expo';

const {StyleSheet, Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

import ColorScheme from "../../common/colorscheme";
export default {
    container: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcomeContainer: {
        width:'80%',
        alignItems:'flex-start'
    },
    welcomeBackMessage: {
        paddingTop:45,
        paddingBottom:5,
        fontSize:normalize(22),
        fontWeight:'700'
    },
    pinView: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
    },
    pinBoxContainer: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:45,
        paddingBottom:45,
        paddingLeft:30
    },
    pinBox: {
        borderWidth: 1,
        borderColor: '#252525',
        borderRadius: 15/2,
        height: 15,
        width: 15,
        marginRight: 30
    },

    pinBoxFilled: {
        backgroundColor: '#252525'
    },

    pinKeyboard: {
        flex: -1,
        flexShrink: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pinKey: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth/3,
        height: 70,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        flexGrow: 1
    },

    pinKeyAction: {
        backgroundColor:'#f8f8f8'
    },

    pinKeyEmpty: {
        backgroundColor: 'rgb(239, 239, 244)',
    },
    pinPromptText: {
        marginBottom: 10,
        color:ColorScheme.enterPinLabelColor,
        fontSize:normalize(13)
    }

};