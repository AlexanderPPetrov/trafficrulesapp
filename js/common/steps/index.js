import React, {Component} from "react";

import {View} from 'react-native';
import StepIndicator from './StepIndicator';
import styles from "./styles";


class Steps extends Component {

    render() {
        return (
            <View style={styles.stepsContainer}>
                <StepIndicator
                    customStyles={styles.customStyles}
                    currentPosition={this.props.currentPage}
                    stepCount={this.props.stepCount}
                    labels={this.props.labels}
                />
            </View>
        );
    }
}

export default Steps;
