const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../colorscheme";

export default {
    customStyles : {
        stepIndicatorSize: 12,
        currentStepIndicatorSize: 20,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 4,
        stepStrokeCurrentColor: ColorScheme.stepActive,
        stepStrokeWidth: 2,
        stepStrokeFinishedColor: ColorScheme.stepActive,
        stepStrokeUnFinishedColor: ColorScheme.stepInactive,
        separatorFinishedColor: ColorScheme.stepActive,
        separatorUnFinishedColor: ColorScheme.stepInactive,
        stepIndicatorFinishedColor: ColorScheme.stepActive,
        stepIndicatorUnFinishedColor: ColorScheme.stepInactive,
        stepIndicatorCurrentColor: ColorScheme.stepActive,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fff'
    },
    stepsContainer: {
        paddingTop:30,
        paddingLeft:45,
        paddingRight:45,
        paddingBottom:15
    }

};
