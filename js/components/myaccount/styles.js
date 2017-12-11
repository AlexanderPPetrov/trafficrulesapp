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
    },

    balanceView: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },

    balanceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    balanceHeader: {
        color:"#888"
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
        backgroundColor: "#f36523",
    },
    brokerageText: {
        color:"#fff"
    }
};
