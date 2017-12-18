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
import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var steps = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

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
        this.props.onUpdatePage(page);
    }

    render () {
        return (
            <ViewPager
                style={this.props.style}
                dataSource={this.state.dataSource}
                ref={(viewpager) => {this.viewpager = viewpager}}
                renderPage={this._renderPage}
                isLoop={false}
                locked={true}
                onChangePage={(page) => {this.changeHandler(page)}}
                renderPageIndicator={false}
                autoPlay={false}/>
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
        this.viewpager.goToPage(this.state.page + 1)
    }
    goBackward = () => {
        this.viewpager.goToPage(this.state.page - 1)
    }
}

var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:300
    },
});

export default Tabs;