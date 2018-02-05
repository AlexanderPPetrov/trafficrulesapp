import React, {Component} from "react";
import {View, Modal, ViewPropTypes, Animated, Text} from "react-native";
import styles from "./styles";
import {Constants} from 'expo';
import {
    Button
} from "native-base";
import ColorScheme from "../colorscheme";
import {Grid, Row, Col} from "react-native-easy-grid";

class Notification extends Component {

    render() {
        return <Button transparent style={styles.notification} onPress={() => this.props.onPress()}>
            <Grid>
                <Row>
                    <Col>
                        <Text style={styles.notificationTitle}>{this.props.title}</Text>
                        <Text style={styles.notificationMessage}>{this.props.message}</Text>
                    </Col>
                </Row>
            </Grid>

        </Button>
    }
}

export default Notification;
