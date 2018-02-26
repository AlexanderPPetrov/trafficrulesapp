const React = require("react-native");

const {StyleSheet, Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

import ColorScheme from "../../common/colorscheme";
export default {

    unreadContainer: {
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor:'rgba(0,0,0,0.5)'
    },


    container: {
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1000,
        left: 15,
        right: 15,
    },

    notification: {
        alignSelf:'stretch',
        flex:1,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        height:70,
        marginBottom:5,
        elevation:1,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },

    notificationTitle: {
        paddingTop:5,
        paddingBottom:5
    },

    notificationMessage: {
        paddingTop:5,
        paddingBottom:5,
        color: '#555'
    },
    notificationButton: {
        position:'relative',
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        backgroundColor:'transparent',
        width:45,
        paddingLeft:0,
        marginRight:0,
        paddingRight:0
    },
    toggleNotification: {
        position:'absolute',
        fontSize:26,
        top:13,
        left:22,
        opacity:0.3,
        color:'#fff'
    },
    notificationsBadge: {
        position:'absolute',
        borderRadius:4,
        top:17,
        right:5,
        width:8,
        height:8,
        backgroundColor:'red'
    },
    notificationsBadgeInactive: {
        opacity:0
    },
    notificationsList: {
        position:'absolute',
        width:'100%',
        top:30,
        height:'100%',
        backgroundColor:'black'
    },
    notificationsActive: {
        color:'#fff',
        opacity:1
    },
    notificationIconContainer: {
        marginTop:5
    },
    withdrawAccepted: {
        backgroundColor: ColorScheme.win
    }
};