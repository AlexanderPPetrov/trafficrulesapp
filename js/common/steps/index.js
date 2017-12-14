import React, {Component} from "react";

import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import styles from "./styles";

const labels = ["", "", "", ""];

class Steps extends Component {

    render() {
        return (
            <View style={styles.stepsContainer}>
                <StepIndicator
                    customStyles={styles.customStyles}
                    currentPosition={this.props.currentPosition}
                    stepCount={this.props.stepCount}
                    labels={labels}
                />
            </View>
        );
    }
}

export default Steps;
