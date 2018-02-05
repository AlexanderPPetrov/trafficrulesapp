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
    pinView: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'rgb(239, 239, 244)',
    },
    pinBox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30/2,
        height: 30,
        width: 30,
        marginRight: 15
    },

    pinBoxFilled: {
        backgroundColor: 'black'
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
        borderColor: 'rgb(239, 239, 244)',
        flexGrow: 1
    },
    pinKeyEmpty: {
        backgroundColor: 'rgb(239, 239, 244)',
    },
    pinPromptText: {
        marginBottom: 10,
    }

};