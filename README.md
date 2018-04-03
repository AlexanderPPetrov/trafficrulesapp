# Premium Tradings Mobile App

## Deployment with - **[Expo](https://expo.io/)**
A mobile application for premium tradings

> Used Libraries
>1. Build with - **[React Native](https://facebook.github.io/react-native/)**
>2. Deployment with - **[Expo](https://expo.io/)**
>3. UI Library Components in project from **[NativeBase](http://docs.nativebase.io/Components.html#Components)**

Preview App at:
[Dev Deployment](https://expo.io/@alexppetrov/0213e570e52148c67cde8af51fef384d61456121)

Download [Expo tools](https://docs.expo.io/versions/latest/introduction/installation.html).
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).


## Api endpoints at
Dev Api: [http://api-prmts.dev.cc/index.php/v1/](http://api-prmts.dev.cc/index.php/v1/)

> Dev Test User<br />
> Username: `test9070`<br />
> Password: `test9070`

Production Api : [https://api.premiumtradings.com/index.php/v1/)

> Production Test User<br />
> Username: `TestTest`<br />
> Password: `TestTest`


## Translations
Available languages list: [http://prmts-translations.dev.cc/available_locales.json)

Translations per locale [http://prmts-translations.dev.cc/locales/en.json)

## Project Structure

Edited node_modules for RTL

react-native-drawer-layout-polyfill > index.android.js

Object.defineProperty(exports, "__esModule", { value: true });var _reactNative = require('react-native');exports.default = _reactNative.DrawerLayoutAndroid;
Object.defineProperty(exports, "__esModule", { value: true });var _reactNativeDrawerLayout = require('react-native-drawer-layout');var _reactNativeDrawerLayout2 = _interopRequireDefault(_reactNativeDrawerLayout);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _reactNativeDrawerLayout2.default;