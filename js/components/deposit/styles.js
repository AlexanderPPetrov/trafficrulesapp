const React = require("react-native");

const {StyleSheet} = React;

export default {
    balancePadding: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20,
        paddingBottom:20
    },
    safeBalanceContainer: {
        backgroundColor: "#fff",
    },
    balancesContainer: {
        backgroundColor: "#fce0d4",
        paddingBottom:100
    },

    balanceView: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },



    balanceHeader: {
        color:"#888"
    },

    listItem: {
        backgroundColor:'red',
        flex:1,
        flexDirection: 'row',
        // alignSelf: 'stretch',
        // justifyContent: 'space-between',
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign:'right',
        paddingTop:7,
        paddingBottom:7
    },

    brokerageBalanceContainer: {
        backgroundColor: "#2c3c48",
    },
    brokerageText: {
        color:"#fff"
    }
};
