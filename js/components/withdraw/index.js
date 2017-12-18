import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import Steps from '../../common/steps/index';
import Chat from '../../common/chat/index';
import Tabs from './tabs';
import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Form,
    Picker,
    Item as FormItem,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
} from "native-base";

import {View, ScrollView} from 'react-native';

import styles from "./styles";
import Api from "../../../Api";

const Item = Picker.Item;

class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0
        }
    }

    goBackward = () => {
        this.tabs.goBackward()
    }
    goForward = () => {
        this.tabs.goForward()

    }
    changeHandler = (page) => {
        this.setState({
            currentPage: page
        });
    }

    render() {

        let headerButton = <Button transparent onPress={this.goBackward}>
            <Icon name="arrow-back"/>
        </Button>
        if (this.state.currentPage == 0) {
            headerButton = <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name="ios-menu"/>
            </Button>
        }

        return (
            <Container style={styles.container}>
                <Header hasTabs>
                    <Left>
                        {headerButton}
                    </Left>
                    <Body>
                    <Title>{I18n.t('withdraw')}</Title>
                    </Body>
                    <Right>
                        <Button transparent small>
                            <Text style={{textAlign: 'right'}}>{I18n.t('cancel')}</Text>
                        </Button>
                    </Right>

                </Header>
                <Content padder>
                    <Steps currentPosition={this.state.currentPage} stepCount={5}></Steps>
                    <Tabs onRef={ref => (this.tabs = ref)} {...this.props} onUpdatePage={this.changeHandler}></Tabs>
                    <Chat></Chat>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={this.goForward}>
                            <Text>{I18n.t('continue')}</Text>
                        </Button>

                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

export default Withdraw;
