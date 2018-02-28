import {normalize} from "../ui";

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
        zIndex:1000,
        elevation:3,
        left: 0,
        right: 0,
    },

    notification: {
        alignSelf:'stretch',
        flex:1,
        backgroundColor: "#fff",
        paddingRight:0,
        paddingLeft:0,
        paddingTop:0,
        paddingBottom:0,
        borderRadius:0,
        height:null
    },
    notificationPadding : {
        minHeight:75,
        paddingLeft:17,
        paddingRight:17,
        paddingTop:15,
        paddingBottom:15
    },

    notificationTitle: {
        paddingTop:5,
        paddingBottom:5,
        color:ColorScheme.darkest
    },
    notificationDate: {
        color:ColorScheme.light
    },

    notificationMessage: {
        color: ColorScheme.regular,
        fontSize:normalize(14),
        paddingRight:12
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
        left:19,
        opacity:0.3,
        color:'#fff'
    },
    notificationsBadge: {
        position:'absolute',
        borderRadius:4,
        top:17,
        right:8,
        width:8,
        height:8,
        backgroundColor:'red'
    },

    unreadIndicator: {
        position:'absolute',
        borderRadius:4,
        bottom:0,
        right:0,
        width:8,
        height:8,
        backgroundColor:ColorScheme.info
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
    withdrawAccepted: {
        backgroundColor: ColorScheme.win
    }
};