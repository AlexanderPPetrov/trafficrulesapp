import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {AppRegistry, SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import styles from "./styles";
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import {Grid, Row, Col} from "react-native-easy-grid";
import {Button, Content, Card, CardItem, List, ListItem, Separator, Right, Left, Body} from "native-base";

const accountTypes = ['sport']
const listOrder = ['_site', '_username', '_currency', '_credit', '_balance', '_last_status']

class AccountsList extends Component {


    getListItem = (account, property, i) => {
        return <ListItem key={i}>
            <Col size={2}>
                <Text>{I18n.t(property)}</Text>
            </Col>
            <Col size={3}>
                <Text style={{textAlign:'right'}}>{account[property]}</Text>
            </Col>
        </ListItem>
    }

    getCard = (account, i) => {
        let cardListItems = listOrder.map((property, i) =>
            this.getListItem(account, property, i)
        );
        return <Card key={i}>
            <List>
            <Separator bordered>
                    {account._type == '0' ? <FontAwesome name="soccer-ball-o" size={22} style={styles.headerIcon}/> :
                        <SimpleLineIcons name="user" size={22} style={styles.headerIcon}/>}
                    <Text>{I18n.t(accountTypes[account._type]) + ' ' + I18n.t('account')}</Text>

                <Right>
                    <Button onPress={() => this.props.navigation.navigate("PreviousBalance", {
                                _id: account._id,
                                _username: account._username,
                                _currency: account._currency
                            })}>
                        <Text>{I18n.t('previousBalances')}</Text>
                    </Button>
                </Right>

            </Separator>
           {cardListItems}
            </List>
        </Card>;
    };

    getAccountCards = (accounts) => {
        let cardsList = accounts.map((account, i) =>
            this.getCard(account, i)
        );
        return (
            <Content padder>
                {cardsList}
            </Content>
        );
    };

    render() {
        return (
            this.getAccountCards(this.props.accounts)


            // <ScrollView>
            //     <SectionList
            //         sections={this.prepareData(this.props.accounts)}
            //         renderSectionHeader={({section}) =>
            //             <View style={styles.headerContainer}>
            //                 <Grid>
            //                     <Row style={{
            //                         backgroundColor: "#808080",
            //                         height: 50,
            //                         justifyContent: 'center',
            //                         alignItems: 'center'
            //                     }}>
            //                         <Col size={1}>
            //                             {section._type == 'sport' ?
            //                                 <FontAwesome name="soccer-ball-o" size={22} style={styles.headerIcon}/> :
            //                                 <SimpleLineIcons name="user" size={22} style={styles.headerIcon}/>}
            //                         </Col>
            //                         <Col size={4}>
            //                             <Text style={styles.headerLabel}>{section.title}</Text>
            //                         </Col>
            //                         <Col size={4} style={{marginRight: 5}}>
            //                             <Button block light style={styles.headerButton}
            //                                     onPress={() => this.props.navigation.navigate("PreviousBalance", {
            //                                         _id: section._id,
            //                                         _username: section._username,
            //                                         _currency: section._currency
            //                                     })}>
            //                                 <Text>{I18n.t('previousBalances')}</Text>
            //                             </Button>
            //                         </Col>
            //                     </Row>
            //                 </Grid>
            //             </View>
            //         }
            //
            //         renderItem={({item, section}) =>
            //             <View key={section._id} style={styles.balanceView}>
            //                 <ListItem label={'site'} value={item._site}></ListItem>
            //                 <ListItem label={'username'} value={item._username}></ListItem>
            //                 <ListItem label={'currency'} value={item._currency}></ListItem>
            //                 <ListItem label={'credit'} value={item._credit}></ListItem>
            //                 <ListItem label={'balance'} value={item._balance}></ListItem>
            //                 <ListItem label={'lastStatus'} value={item._last_status}></ListItem>
            //             </View>
            //         }
            //
            //         keyExtractor={(item, index) => index}
            //     />
            //
            // </ScrollView>

        );
    }
}

export default AccountsList;
