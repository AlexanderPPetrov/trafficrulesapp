import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import ListItem from "./listitem";
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import { Grid, Row, Col } from "react-native-easy-grid";
import {Button} from "native-base";



class Balance extends Component {

    prepareData = (data) => {
        let sectionsData = [];
        data.map((value) => {
            let section = {
                _date_created: value._date_created,
                balanceColor:'',
                data: [value]
            };

            if(value._change > 0.00){
                section.balanceColor = 'balanceGreen'
            }
            if(value._change < 0.00){
                section.balanceColor = 'balanceRed'
            }


            console.log(value._date_created)

            sectionsData.push(section)
        });
        return sectionsData;
    };

    render() {
        return (
            <ScrollView style={styles.container} >
                <SectionList
                    sections={this.prepareData(this.props.balance)}
                    renderSectionHeader={({section}) =>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerLabel}>{section._date_created}</Text>
                        </View>
                    }

                    renderItem={({item, section}) =>
                        <View key={section._id} style={styles.balanceView}>
                            <ListItem label={'balance'} value={item._balance + ' ' + this.props.currency}></ListItem>
                            <ListItem label={'change'} value={item._change} color={section.balanceColor}></ListItem>
                        </View>
                    }

                    keyExtractor={(item, index) => index}
                />

            </ScrollView>

        );
    }
}

export default Balance;