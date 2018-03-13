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
import {View} from 'react-native';
import NotificationsButton from '../notifications/notificationsbutton';
import ColorScheme from '../../common/colorscheme';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Controller from '../../../Controller';

const activeRoutes  = ['MyAccount','Accounts','Brokerage','Transactions']

let navigationInstance = null;
let headerInstance = null;

class HeaderWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRoute: null,
            title:''
        }

        headerInstance = this;
    }

    componentDidMount = () =>{
        if(this.props.indicatorRoute) this.setRoute(this.props.indicatorRoute)
        if(this.props.title) this.setState({
            title: this.props.title
        })
    }

    static setNavigation = (navigation) => {
        navigationInstance = navigation
    }

    static setRoute = (route) => {
        if(headerInstance) headerInstance.setRoute(route)
    }

    setRoute = (currentRoute) => {
        this.setState({
            currentRoute,
            title: I18n.t(this.camelCase(currentRoute))
        })
    }

    camelCase = (string) => {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

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
                <MaterialCommunityIcons name="close" style={{fontSize: 22, textAlign: 'right', color:ColorScheme.headerColor}}/>
            </Button>
        }
        return <NotificationsButton/>
    }

    getHeaderIndicators = () => {
        if(this.state.currentRoute) {


            const indicators = activeRoutes.map((route, i) => {
                    let style = {
                        borderRadius: 10 / 2,
                        height: 6,
                        width: 6,
                        marginRight: 7,
                        backgroundColor:'rgba(255,255,255,0.3)',
                    };

                    if(this.state.currentRoute === route) {
                        style.backgroundColor = ColorScheme.headerColor;
                    }

                    return <View key={i} style={style}/>
            });

            return <View pointerEvents="none" style={{
                flexDirection: 'row',
                alignItems:'center',
                justifyContent:'flex-end',
                position:'absolute',
                width:'100%',
                height:'100%',
                right:60

            }}>
                {indicators}
            </View>
        }
        return null;
    }

    render() {
        return <Header hasTabs={this.props.hasTabs}>
                             <StatusBar/>
                             <Left>
                                 {this.getLeft()}
                             </Left>
                             {this.getHeaderIndicators()}
                             <Body style={{flex:3}}>
                             <Title style={{paddingLeft:15}}>{this.state.title}</Title>
                             </Body>
                             <Right>
                                 {this.getRight()}
                             </Right>
                         </Header>

    }
}

export default HeaderWrapper;
