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


};