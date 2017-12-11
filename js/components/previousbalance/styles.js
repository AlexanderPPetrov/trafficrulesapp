const React = require("react-native");

const {StyleSheet} = React;

export default {
    container: {
        backgroundColor:"#fff",
        padding:20
    },

    headerContainer: {
        paddingBottom:15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    headerLabel: {
        color: "#222",
        fontSize: 18,
    },

    balanceView: {
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 1,
        paddingBottom:15,
        marginBottom:15
    },

    balanceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 7,
        paddingBottom: 7
    },

    balanceLabel: {
        flex: 5,
        fontSize: 16,
        flexDirection: 'row',
        fontWeight: 'bold',
        justifyContent: 'flex-start'
    },

    balanceValue: {
        flex: 4,
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'left'
    },

    balanceRed: {
        color:'#f22f31'
    },
    balanceGreen: {
        color:'#0caf43'
    }


};
