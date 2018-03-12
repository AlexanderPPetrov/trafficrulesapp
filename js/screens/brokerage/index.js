import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body
} from "native-base";
import Ui from '../../common/ui';
import Header from '../../common/header/header';

import Tabs from "./tabs";

class Brokerage extends Component {

    componentDidMount = () => {

        Header.setNavigation(this.props.navigation)
        this.navigationSubscribe = this.props.navigation.addListener(
            'willFocus',
            () => {
                Header.setRoute('Brokerage')
            }
        );
    }

    componentWillUnmount = () => {
        this.navigationSubscribe.remove();
    }

    render() {
        return (
            <Container style={Ui.container}>
                <Tabs></Tabs>
            </Container>
        );
    }
}

export default Brokerage;
