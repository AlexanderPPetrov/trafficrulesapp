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

import styles from "./styles";
import Api from "../../../Api";

class Brokerage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _payload: {
                transactions:[]
            }

        }
    }

    componentDidMount = () => {
        // Api.get({
        //     url: 'get-member-transactions',
        //     success: this.dataLoaded
        // })
    }

    dataLoaded = (response) =>{
        this.setState({
            _payload:response
        })
    }

    render() {
        return (
            <Container style={styles.container}>
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

            </Container>
        );
    }
}

export default Brokerage;
