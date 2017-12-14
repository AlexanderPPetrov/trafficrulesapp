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

    headerContainer: {
        backgroundColor:"#808080",
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerIcon: {
        color:"#fff",
    },
    headerLabel: {
        color:"#999",
        fontSize:16,
        marginLeft:7
    },
    headerButton: {
        height:30
    },
    balanceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:7,
        paddingBottom:7
    },

    balanceLabel: {
        flex: 5,
        flexDirection: 'row',
        fontWeight:'bold',
        justifyContent: 'flex-start'
    },

    balanceValue: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign:'left'
    },

    brokerageBalanceContainer: {
        backgroundColor: "#f36523",
    },
    brokerageText: {
        color:"#fff"
    }
};
