import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import I18n from '../../../i18n/i18n';

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/logo-kitchen-sink.png");

class Home extends Component {
	// eslint-disable-line

    componentWillMount(){
        I18n.initAsync();
    }
	render() {

		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						<Image source={launchscreenLogo} style={styles.logo} />
					</View>
					<View
						style={{
							alignItems: "center",
							marginBottom: 50,
							backgroundColor: "transparent",
						}}
					>
						<H3 style={styles.text}>{I18n.t('greeting')}</H3>
						<View style={{ marginTop: 8 }} />
						<H3 style={styles.text}>NativeBase components</H3>
						<View style={{ marginTop: 8 }} />
					</View>
					<View style={{ marginBottom: 80 }}>
						<Button
							style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
							onPress={() => this.props.navigation.navigate("DrawerOpen")}
						>
							<Text>Lets Go!</Text>
						</Button>
					</View>
				</Image>
			</Container>
		);
	}
}


export default Home;
