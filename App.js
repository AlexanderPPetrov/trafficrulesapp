import Expo from "expo";
import React from "react";
import App from "./js/App";

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <App />;
  }
}
