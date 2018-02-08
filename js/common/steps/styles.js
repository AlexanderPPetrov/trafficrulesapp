const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../colorscheme";

export default {
    customStyles : {
        stepIndicatorSize: 15,
        currentStepIndicatorSize:15,
        separatorStrokeWidth: 1,
        currentStepStrokeWidth: 1,
        stepStrokeCurrentColor: ColorScheme.stepActive,
        stepStrokeWidth: 1,
        stepStrokeFinishedColor: ColorScheme.stepActive,
        stepStrokeUnFinishedColor: ColorScheme.stepInactive,
        separatorFinishedColor: ColorScheme.stepActive,
        separatorUnFinishedColor: ColorScheme.stepInactive,
        stepIndicatorFinishedColor: ColorScheme.stepActive,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: ColorScheme.stepLabel,
        labelSize: 12,
        currentStepLabelColor: ColorScheme.stepLabelActive,

    },
    stepsContainer: {
        paddingTop:15,
        paddingBottom:15
    }

};

