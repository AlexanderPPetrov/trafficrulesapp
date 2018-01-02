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
        margin:15
    }

};
