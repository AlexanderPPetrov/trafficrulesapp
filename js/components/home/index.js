import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import I18n from '../../../i18n/i18n';

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import Login from "./login";
import styles from "./styles";

import {MaterialCommunityIcons} from '@expo/vector-icons';

// const launchscreenBg = require("../../../img/login_logo.png");
const launchscreenLogo = require("../../../img/login_logo.png");


class Home extends Component {
	// eslint-disable-line


	render() {

		return (
			<Container style={styles.loginContainer}>
				<StatusBar barStyle="light-content" />
				<View style={styles.imageContainer}>
					<Image source={launchscreenLogo} style={styles.logo}></Image>
					<MaterialCommunityIcons name="account-box" size={100} style={styles.avatar}></MaterialCommunityIcons>

					<Text style={styles.helloMessage}>Hello John!</Text>
				</View>
					<Login navigation={this.props.navigation}></Login>

			</Container>
		);
	}
}


export default Home;
