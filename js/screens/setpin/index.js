import React, { Component } from "react";
import { Image, View, StatusBar, Dimensions } from "react-native";

import I18n from '../../../i18n/i18n';
import Logo from '../../common/logo/logo';
import ColorScheme from "../../common/colorscheme";

import { Container, Button, H3, Header, Title, Body, Left, Right, Text } from "native-base";
import Pin from "./pin";
import styles from "./styles";

import {MaterialCommunityIcons} from '@expo/vector-icons';

import { Svg } from 'expo';
const {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} = Svg;


class Home extends Component {
	// eslint-disable-line
    constructor (props) {
        super(props)
        let {width, height} = Dimensions.get('window')
        let scale = (width - 80) / 500;
        this.state = {
            scale:scale,
			width:width,
			height:height
        };
    }

	render() {

		return (
			<Container >
				<StatusBar barStyle="light-content" />

				<Svg height={this.state.height} width={this.state.width} style={{position:'absolute'}}>
					<Defs>
						<RadialGradient id="grad" cx="20%" cy="0%" rx={this.state.height} ry={this.state.height} fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
							<Stop
								offset="0%"
								stopColor={ColorScheme.dark}
								stopOpacity="1"
							/>
							<Stop
								offset="100%"
								stopColor={ColorScheme.darker}
								stopOpacity="1"
							/>
						</RadialGradient>
					</Defs>
					<Rect x="0" y="0" width={this.state.width} height={this.state.height} fill="url(#grad)" >
					</Rect>
				</Svg>

				<View style={styles.loginContainer}>
					<View style={styles.imageContainer}>
						<Logo scale={this.state.scale} primary={ColorScheme.neutralLight} secondary={ColorScheme.action} slogan={ColorScheme.neutralLight}></Logo>
                        {/*<View>*/}
                        {/*<MaterialCommunityIcons name="account-box" size={100} style={styles.avatar}></MaterialCommunityIcons>*/}
                        {/*<Text style={styles.helloMessage}>Hello John!</Text>*/}
                        {/*</View>*/}
					</View>
					<Pin navigation={this.props.navigation}></Pin>
				</View>
			</Container>
		);
	}
}


export default Home;
