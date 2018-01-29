const React = require("react-native");

const {StyleSheet} = React;
import ColorScheme from "../../common/colorscheme";
import { normalize } from "../../common/ui";

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
        justifyContent: 'flex-start',
        width: 30
    },

    headerButton: {
        height: 30
    },
    accountValue: {
        textAlign: 'right',
        color: ColorScheme.light
    }
};
