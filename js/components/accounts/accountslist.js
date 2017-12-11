import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import ListItem from "./listitem";
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import { Grid, Row, Col } from "react-native-easy-grid";
import {Button} from "native-base";
const accounts = [{
    "_id": 51203,
    "_type": "sport",
    "_site": "1Bet",
    "_username": "hhh562",
    "_currency": "EUR",
    "_credit": 1500,
    "_balance": 1500.00,
    "_last_status": "2016-02-24"
},
    {
        "_id": 51203,
        "_type": "user",
        "_site": "1Bet",
        "_username": "hhh562",
        "_currency": "EUR",
        "_credit": 1500,
        "_balance": 1500.00,
        "_last_status": "2016-02-24"
    },
    {
        "_id": 51203,
        "_type": "user",
        "_site": "1Bet",
        "_username": "hhh562",
        "_currency": "EUR",
        "_credit": 1500,
        "_balance": 1500.00,
        "_last_status": "2016-02-24"
    },    {
        "_id": 51203,
        "_type": "user",
        "_site": "1Bet",
        "_username": "hhh562",
        "_currency": "EUR",
        "_credit": 1500,
        "_balance": 1500.00,
        "_last_status": "2016-02-24"
    },    {
        "_id": 51203,
        "_type": "user",
        "_site": "1Bet",
        "_username": "hhh562",
        "_currency": "EUR",
        "_credit": 1500,
        "_balance": 1500.00,
        "_last_status": "2016-02-24"
    },    {
        "_id": 51203,
        "_type": "user",
        "_site": "1Bet",
        "_username": "hhh562",
        "_currency": "EUR",
        "_credit": 1500,
        "_balance": 1500.00,
        "_last_status": "2016-02-24"
    }
];


class AccountsList extends Component {

    prepareData = (data) => {
        let sectionsData = [];
        data.map((value) => {
            let section = {
                _id: value._id,
                _type: value._type,
                _username: value._username,
                title: value._type + ' ' + I18n.t('account'),
                data: [value]
            };
            sectionsData.push(section)
        });
        return sectionsData;
    };

    render() {
        return (
            <ScrollView>
                <SectionList
                    sections={this.prepareData(accounts)}
                    renderSectionHeader={({section}) =>
                        <View style={styles.headerContainer}>
                            <Grid>
                                <Row style={{ backgroundColor: "#808080", height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                    <Col size={1}>
                                        {section._type == 'sport' ?
                                            <FontAwesome name="soccer-ball-o" size={22} style={styles.headerIcon}/> :
                                            <SimpleLineIcons name="user" size={22} style={styles.headerIcon}/>}
                                    </Col>
                                    <Col size={4}>
                                        <Text style={styles.headerLabel}>{section.title}</Text>
                                    </Col>
                                    <Col size={4} style={{marginRight:5}}>
                                        <Button block light style={styles.headerButton} onPress={() => this.props.navigation.navigate("PreviousBalance", {_id: section._id, _username: section._username})}>
                                            <Text>{I18n.t('previousBalances')}</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                    }

                    renderItem={({item, section}) =>
                        <View key={section._id} style={styles.balanceView}>
                            <ListItem label={'site'} value={item._site}></ListItem>
                            <ListItem label={'username'} value={item._username}></ListItem>
                            <ListItem label={'currency'} value={item._currency}></ListItem>
                            <ListItem label={'credit'} value={item._credit}></ListItem>
                            <ListItem label={'balance'} value={item._balance}></ListItem>
                            <ListItem label={'lastStatus'} value={item._last_status}></ListItem>
                        </View>
                    }

                    keyExtractor={(item, index) => index}
                />

            </ScrollView>

        );
    }
}

export default AccountsList;
