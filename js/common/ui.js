const React = require("react-native");
import ColorScheme from "./colorscheme";

const {StyleSheet, Dimensions, Platform, PixelRatio} = React;
const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');

const scale = deviceWidth / 320;

export function normalize(size) {
    size = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}

export default {

    container: {
        backgroundColor: ColorScheme.mainBackground
    },
    inputLabel: {
        fontSize: normalize(14),
    },
    inputLabelFocused: {
        width: 0,
        fontSize: normalize(10),
    },

    listHeader: {
        backgroundColor: ColorScheme.listHeaderBackground,
        height: 45,
        justifyContent: 'center',
        paddingLeft: 15,
        borderBottomWidth: 2,
        borderBottomColor: ColorScheme.info
    },
    listHeaderExtended: {
        height: 50,
        paddingLeft: 10
    },
    listHeaderLabel: {
        fontSize: 14,
        color: '#292929',
    },
    headerIcon: {
        color: '#292929'
    },
    headerLabel: {
        color: '#292929',
        fontSize: normalize(13),
        marginLeft: 7
    },
    balanceHeader: {
        textAlign: 'center',
        color: ColorScheme.balanceHeaderColor,
        fontSize: normalize(12)
    },
    listItem: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorScheme.neutralLight,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 78,
        minHeight: 40
    },
    itemLabel: {
        color: ColorScheme.darker,
        fontSize: normalize(13),
        fontFamily: 'Roboto_light',
        textAlign: 'left',
        alignSelf: 'stretch'
    },
    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch',
        fontSize: normalize(18),
        color: ColorScheme.darkest,
        fontFamily: 'Roboto_light'
    },
    balanceValueSmall: {
        fontSize: 16,
    },
    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto_light',
        color: ColorScheme.darker,
        paddingTop: normalize(10) / 4,
        paddingLeft: 5,
        fontSize: normalize(10)
    },
    currencyWidth: {
        width: 30
    },
    cardHeader: {
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        fontSize: 15,
        lineHeight: 15,
        paddingTop: 15,
        paddingLeft: 15
    },

    mainBalanceContainer: {
        flex: 1,
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBalanceValue: {
        color: ColorScheme.mainCurrencyColor,
        fontSize: normalize(22),
        fontFamily: 'Roboto_light'
    },

    chatButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: ColorScheme.chatBackgroundColor,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 1.2,
        alignItems:'center',
        justifyContent:'center'
    },

    chatButtonIcon: {
        color:ColorScheme.chatIconColor,
        backgroundColor:'transparent',
        fontSize:45
    },

    mainBalanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto_light',
        color: ColorScheme.darker,
        paddingTop: normalize(13) / 5,
        paddingLeft: 5,
        fontSize: normalize(13),
        paddingRight: 15
    },
    datePickerContainer: {
        padding: 15,
        paddingTop: 10,
        paddingBottom: 0,
        marginBottom: 0
    },
    datePickerLabel: {
        fontSize: 13,
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        backgroundColor: 'transparent'
    },
    datePickerStyles: {
        dateIcon: {
            // position: 'absolute',
            // left: 0,
            // top: 5,
            marginLeft: 0
        },
        dateInput: {
            marginRight: 0,
            borderWidth: 0
        },
        dateText: {
            color: ColorScheme.dark
        }
    },
    calendarIcon: {
        color: ColorScheme.light
    },

    dayLabel: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: normalize(16)
    },
    monthLabel: {
        textAlign: 'center',
        color: ColorScheme.monthLabelColor,
        fontSize: normalize(10)
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 30
    },
    buttonsContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        width: '100%'
    },
    profitHistoryContainer:{
        paddingTop:12,
        paddingBottom:12,
        marginBottom:0,
        paddingRight:12,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth:1,
        borderLeftWidth:4,
        alignItems:"center",
        justifyContent:"center"
    },
    betWin: {
        borderLeftColor: ColorScheme.win
    },
    betLoss: {
        borderLeftColor: ColorScheme.loss
    },
    betDraw: {
        borderLeftColor: ColorScheme.draw
    },

    profitWin: {
        color: ColorScheme.win
    },
    profitLoss: {
        color: ColorScheme.loss
    },

    profitDraw: {
        color: ColorScheme.draw
    },
    buttonLabel: {
        textAlign: 'center',
        flex: 1,
        fontSize: 16
    },

    running: {
        backgroundColor: ColorScheme.running
    },
    win: {
        backgroundColor: ColorScheme.win
    },
    halfWin: {
        backgroundColor: ColorScheme.halfWin
    },
    loss: {
        backgroundColor: ColorScheme.loss
    },
    draw: {
        backgroundColor: ColorScheme.draw
    },
    halfLoss: {
        backgroundColor: ColorScheme.halfLoss
    },
    cancelled: {
        backgroundColor: ColorScheme.cancelled
    },

    stepHeader: {
        textAlign: 'center',
        fontSize: normalize(20),
        fontWeight: '700',
        padding: 10,
        paddingBottom: 45,
        color: ColorScheme.stepHeader
    },
    formLabel: {
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom: 10,
        fontSize: 14
    },
    cardContainer: {
        position: 'relative',
        paddingTop: 15,
        paddingBottom: 5,
        width: deviceWidth,
        minHeight: deviceHeight - 80,
        // minHeight:deviceHeight - 90,
        alignSelf: 'stretch',
        opacity: 1
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker,
        marginLeft: 0,
        padding: 5,
        minHeight: 50
    },
    form: {
        minHeight: 50,
        padding: 0
    },
    inputField: {
        flex: 1,
        fontSize: 18,
        lineHeight: 24,
        color: ColorScheme.darkest
    },
    amountInput: {
        textAlign: 'right',
        fontSize: 36
    },
    amountCurrency: {
        fontFamily: 'Roboto_light',
        color: ColorScheme.darker,
        fontSize: 20,
        paddingTop: 8,
        lineHeight: 20,
        marginLeft: 10
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    successIcon: {
        color: ColorScheme.win,
        fontSize: 45,
        marginBottom: 10
    },
    errorIcon: {
        color: ColorScheme.loss,
        fontSize: 45,
        marginBottom: 10
    },
    cancelIcon: {
        color: ColorScheme.neutralDarkest,
        fontSize: 45,
        marginBottom: 10
    },
    confirmationHeader: {},

    confirmationText: {
        fontFamily: 'Roboto_light',
        fontSize: 16,
        color: ColorScheme.light,
        textAlign: 'center',
        marginTop: 15
    },

    tabsStyle: {
        activeTintColor: ColorScheme.tabActiveColor,
        inactiveTintColor: ColorScheme.tabInactiveColor,
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: ColorScheme.tabsBackground,
        },
        indicatorStyle: {
            backgroundColor: ColorScheme.tabsIndicator
        }
    }


};