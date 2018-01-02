const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../colorscheme";

export default {
    customStyles : {
        stepIndicatorSize: 15,
        currentStepIndicatorSize: 20,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 4,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 2,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: ColorScheme.neutralDarker,
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: ColorScheme.neutralDarker,
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
    },
    stepsContainer: {
        paddingTop:30,
        paddingBottom:15
    }

};
