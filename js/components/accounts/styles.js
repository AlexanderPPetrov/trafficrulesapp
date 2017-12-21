const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../../common/colorscheme";

export default {
    balancePadding: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    safeBalanceContainer: {
        backgroundColor: ColorScheme.neutralLight,
    },

    balanceView: {
        borderBottomColor: ColorScheme.neutralLight,
        borderBottomWidth: 1
    },


    headerIconContainer: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: ColorScheme.primary,
        borderRadius: 30
    },
    headerIcon: {
        color: ColorScheme.neutralLight
    },
    headerLabel: {
        color: ColorScheme.dark,
        fontSize: 14,
        marginLeft: 7
    },
    headerButton: {
        height: 30
    },

    accountValue: {
        textAlign: 'right',
        color: ColorScheme.light
    }

};
