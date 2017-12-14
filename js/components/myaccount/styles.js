const React = require("react-native");

const {StyleSheet} = React;

export default {
    balancePadding: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20,
        paddingBottom:20
    },
    mainBalanceContainer: {
        backgroundColor: "#fff",
    },

    cardHeader: {
        paddingLeft: 10,
        paddingTop:5
    },
    cardBody: {
        flexDirection: 'row',
        flex: 1,
        padding:5
    },
    mainBalanceLabel: {
        color:"#fff",
    },
    mainBalanceValue: {
        color:"#fff",
        fontWeight:'bold',
        fontSize:22
    },
    mainBalance: {
        padding:10,
        margin: 5,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3
    },
    safeBalance:{
        backgroundColor: "#1baf63",
    },
    brokerageBalance: {
        backgroundColor: "#fd9a2c"
    },

    balancesContainer: {
        paddingBottom:100
    },

    balanceView: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },

    balanceHeader: {
        color:"#617d8a"
    },

    listItem: {
        flex:1,
        flexDirection: 'row',
    },

    balanceItem: {
        backgroundColor:'green',
        flex:6,
        flexDirection: 'row'
    },

    balanceLabel: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop:7,
        paddingBottom:7
    },

    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch'
    },

    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'stretch',
        color:'#f36523',
        paddingLeft:5
    }



};
