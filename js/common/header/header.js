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
    Card,
    Body,
    CardItem
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import StatusBar from './statusbar'
import GestureView from '../gestureview/GestureView';
import {View} from 'react-native';
import NotificationsButton from '../notifications/notificationsbutton';
import ColorScheme from '../../common/colorscheme';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Controller from '../../../Controller';

const activeRoutes  = ['MyAccount','Accounts','Brokerage','Transactions']

class HeaderWrapper extends Component {

    getLeft = () => {
        if(this.props.onBack){
            return <Button
                transparent
                onPress={() => this.props.onBack()}
            >
                <Icon name="arrow-back"/>
            </Button>
        }

        return <Button
            transparent
            onPress={() => {
                    Controller.navigateTo("DrawerOpen")
                    Controller.updateSideBar(I18n.locale)
                }
            }
        >
            <Icon name="ios-menu"/>
        </Button>
    }

    getRight = () => {
        if(this.props.cancel === false){
            return null;
        }
        if(this.props.onBack && !this.props.notifications){
        return <Button transparent small onPress={() => Controller.navigateTo("MyAccount")}>
                <MaterialCommunityIcons name="close" style={{fontSize: 22, textAlign: 'right', color:'#fff'}}/>
            </Button>
        }
        return <NotificationsButton/>
    }

    getHeaderIndicators = () => {
        if(this.props.indicatorRoute) {
            const indicators = activeRoutes.map((route, i) =>
                <View key={i} style={{
                    borderRadius: 10 / 2,
                    height: 6,
                    width: 6,
                    marginRight: 10,
                    backgroundColor:route === this.props.indicatorRoute ? ColorScheme.info : 'rgba(255,255,255,0.3)',
                }}/>
            );

            return <View pointerEvents="none" style={{
                flexDirection: 'row',
                alignItems:'center',
                justifyContent:'center',
                position:'absolute',
                width:'100%',
                height:10,
                bottom:5

            }}>
                {indicators}
            </View>
        }
        return null;
    }

    render() {
        return (
            <GestureView
                         content={ <Header hasTabs={this.props.hasTabs}>
                             <StatusBar/>
                             <Left>
                                 {this.getLeft()}
                             </Left>
                             {this.getHeaderIndicators()}
                             <Body style={{flex:3}}>
                             <Title style={{paddingLeft:15}}>{this.props.title}</Title>

                             </Body>
                             <Right>
                                 {this.getRight()}
                             </Right>
                         </Header>}
                         onSwipeRight={(distance, angle) => {
                             const nextIndex = activeRoutes.indexOf(this.props.indicatorRoute) - 1;
                             if(activeRoutes[nextIndex]){
                                 Controller.navigateTo(activeRoutes[nextIndex])
                             }
                         }}
                         onSwipeLeft={(distance, angle) => {
                             const nextIndex = activeRoutes.indexOf(this.props.indicatorRoute) + 1;
                             if(activeRoutes[nextIndex]){
                                 Controller.navigateTo(activeRoutes[nextIndex])
                             }

                         }}
                         onSwipeUp={(distance, angle) => console.log('onSwipeUp')}
                         onSwipeDown={(distance, angle) => console.log('onSwipeDown')}
                         onUnhanledSwipe={(distance, angle) => console.log('onUnhanledSwipe')} />



        );
    }
}

export default HeaderWrapper;
