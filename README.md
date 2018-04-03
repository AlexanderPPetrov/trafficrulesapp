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

Project Structure
Entry point – Root directory -> App.js
	Common – representing reusable components over the screens
	Screens – representing the screens of the application

API handler class – Api.js (handling auth key, get/post requests, formatting the data, decrypting the notifications data). Used in nearly all the screens.
Controller class – Controller.js – Used for controlling navigations within the application. Keeping references of previous and current screen. Used for handling notifications and their redirect actions. Also controlling hide/show of pin modal due to couple of different cases when that should happen.
I18n translations implementation with a fallback locale named“back” (local translations key-values pairs) when the translations loading fails.

Main libraries used:
Expo – features we are using:
•	Notifications handling
•	App loading - splash screen and caching assets (fonts, images)
•	Secure local storage used for saving credentials on device
•	Detecting user locale
•	Fingerprint
•	Automated update process for users when new version is released on the app stores. (We need to implement the new way as expo just released updates concerning that process)
Building processes - taking care of certificates and builds which saves us a lot of time

Limitations coming from Expo
Unable to use a large amount of 3rd party react native libraries.
Cannot write custom native android/iOS code. (There is a way of the so called detached expo project where we can do that but it will cause a lot of problems after that)

React Navigation – features we are using:
•	StackNavigator – our main application navigation handler
•	DrawerNavigator – our menu is build with that
•	TabNavigator – we use that for swiping through the main 4 screens as well as for the   Brokerage Tabs

Native Base – UI library
•	We use couple of UI class components provided from that library. (Grid system of easy to use rows/columns layouts, lists and list Items, swipable rows used for our notifications dismiss functionality, Inputs with labels).

Not all of the components provided from that library are exactly what we needed which led to writing our custom UI components.




Styling the Application:
•	ColorScheme.js – Our class having key/value pairs of the colors that we use within the application
•	Ui.js – Common styles used in the different screens of the application.
•	Explicit styling of a component is done within the same directory of the component with a file named styles.js or directly within the style property of the component





Edited node_modules for RTL

react-native-drawer-layout-polyfill > index.android.js

Object.defineProperty(exports, "__esModule", { value: true });var _reactNative = require('react-native');exports.default = _reactNative.DrawerLayoutAndroid;
Object.defineProperty(exports, "__esModule", { value: true });var _reactNativeDrawerLayout = require('react-native-drawer-layout');var _reactNativeDrawerLayout2 = _interopRequireDefault(_reactNativeDrawerLayout);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _reactNativeDrawerLayout2.default;