'use strict';

import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    Image,
} from 'react-native';
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

import StepOne from './stepone'
var deviceWidth = Dimensions.get('window').width;


class Tabs extends Component {

    constructor() {
        super();
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataSource: dataSource.cloneWithPages(steps),
            page:0
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }

    changeHandler = (page) => {
        this.setState({
            page:page
        })
        //this.props.onUpdatePage(page);
    }

    render () {
        return (
            <View>
                <Text>Text</Text>
            </View>
        );
    }

    _renderPage = (
        data: Object,
        pageID: number | string) =>{

        return (
            <Card style={{minHeight:200}}>
                <StepOne></StepOne>
            </Card>
        );
    }

    goForward = () => {
        //this.viewpager.goToPage(this.state.page + 1)
    }
    goBackward = () => {
       // this.viewpager.goToPage(this.state.page - 1)
    }
}

var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:300
    },
});

export default Tabs;