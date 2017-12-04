import Expo from "expo";
import React from "react";
import App from "./js/App";

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
        data
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });


    this.getData()
  }

  getData(){
    return fetch('translations.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({data:})
            this.setState({ isReady: true });
        })
        .catch((error) => {
          console.error(error)
        })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <App />;
  }
}
