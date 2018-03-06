const React = require("react-native");

const {StyleSheet, Platform, Dimensions} = React;
import ColorScheme from "../../common/colorscheme";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    sidebar: {
        flex: 1,
        backgroundColor: ColorScheme.neutralLight
    },
    drawerCover: {
        alignSelf: "stretch",
        // resizeMode: 'cover',
        height: deviceHeight / 5.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    menuHeader: {
        padding: 25,
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingTop: Platform.OS === "android" ? 7 : 5
    },
    sidebarIcon: {
        fontSize: 21,
        color: "#fff",
        lineHeight: Platform.OS === "android" ? 21 : 25,
        backgroundColor: "transparent",
        alignSelf: "center"
    },
    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20,
        color:ColorScheme.darkest
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
};
