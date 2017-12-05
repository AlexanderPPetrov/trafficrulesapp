import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import I18n from '../../../i18n/i18n';

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import Login from "./login";
import styles from "./styles";

// const launchscreenBg = require("../../../img/login_logo.png");
const launchscreenLogo = require("../../../img/login_logo.png");
const avatar = require("../../../img/avatar.png");

class Home extends Component {
	// eslint-disable-line


	render() {

		return (
			<Container style={styles.loginContainer}>
				<StatusBar barStyle="light-content" />
				<View style={styles.imageContainer}>
					<Image source={launchscreenLogo} style={styles.logo}></Image>
					<Image source={avatar} style={styles.avatar}></Image>
					<Text style={styles.helloMessage}>Hello John!</Text>
				</View>
					<Login navigation={this.props.navigation}></Login>

					{/*<View style={{ marginBottom: 80 }}>*/}
						{/*<Button*/}
							{/*style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}*/}
							{/*onPress={() => this.props.navigation.navigate("DrawerOpen")}*/}
						{/*>*/}
							{/*<Text>Lets Go!</Text>*/}
						{/*</Button>*/}
					{/*</View>*/}

			</Container>
		);
	}
}


export default Home;
