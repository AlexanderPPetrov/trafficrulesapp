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
        elevation:1,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },

    notificationTitle: {
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.1)',
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5
    },

    notificationMessage: {
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        color: '#555'
    },
    notificationButton: {
        position:'relative',
        alignItems:'flex-start',
        justifyContent: 'flex-end',
        paddingLeft:30
    },
    toggleNotification: {
        position:'absolute',
        fontSize:30,
        top:8,
        left:15,
        opacity:0.5,
        color:'grey'
    },
    notificationsBadge: {
        backgroundColor:'red',
        paddingBottom:3,
        paddingHorizontal:5,
        color:'#fff'
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
};