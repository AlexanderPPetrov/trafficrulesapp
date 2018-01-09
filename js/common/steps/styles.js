const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../colorscheme";

export default {
    customStyles : {
        stepIndicatorSize: 20,
        currentStepIndicatorSize:25,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 2,
        stepStrokeCurrentColor: ColorScheme.stepActive,
        stepStrokeWidth: 2,
        stepStrokeFinishedColor: ColorScheme.stepActive,
        stepStrokeUnFinishedColor: ColorScheme.stepInactive,
        separatorFinishedColor: ColorScheme.stepActive,
        separatorUnFinishedColor: ColorScheme.stepInactive,
        stepIndicatorFinishedColor: ColorScheme.stepActive,
        stepIndicatorUnFinishedColor: ColorScheme.stepInactive,
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: ColorScheme.neutralDarker,
        labelSize: 12,
        currentStepLabelColor: ColorScheme.stepActive
    },
    stepsContainer: {
        paddingTop:15,
        paddingBottom:15
    }

};

