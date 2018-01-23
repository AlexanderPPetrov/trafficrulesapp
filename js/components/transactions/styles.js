const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../../common/colorscheme";
import { normalize } from "../../common/ui";

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

    headerIconContainer: {
        justifyContent: 'flex-start',
        width: 30
    },

    headerIcon: {
        color: ColorScheme.dark
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

    headerLabel: {
        color: ColorScheme.dark,
        fontSize: normalize(13),
        textAlign:'left',
        marginLeft: 7
    },

    brokerageBalanceContainer: {
        backgroundColor: "#2c3c48",
    },
    brokerageText: {
        color:"#fff"
    }
};
