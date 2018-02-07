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
import Controller from '../../../Controller';
import Header from '../../common/header/header';

import styles from "./styles";
import Tabs from "./tabs";

class Brokerage extends Component {

    componentDidMount = () => {
        const navigation = this.props.navigation;
        if(navigation && navigation.state && navigation.state.params){
            console.log(navigation.state.params.settledBets)
        }
    }
    render() {
        return (
            <Container style={Ui.container}>
                <Header
                    hasTabs
                    title={I18n.t('brokerage')}
                />

                <Tabs></Tabs>
            </Container>
        );
    }
}

export default Brokerage;
