import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Header,
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

import styles from "./styles";
import Tabs from "./tabs";

class Brokerage extends Component {

    render() {
        return (
            <Container style={Ui.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('brokerage')}</Title>
                    </Body>
                    <Right/>
                </Header>

                <Tabs></Tabs>
            </Container>
        );
    }
}

export default Brokerage;
