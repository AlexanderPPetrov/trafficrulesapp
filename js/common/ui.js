const React = require("react-native");
import ColorScheme from "./colorscheme";

const {StyleSheet, Dimensions, Platform, PixelRatio} = React;
const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');
import {Constants} from 'expo';


if(Platform.OS == 'ios' && Constants.platform.ios.model.toLowerCase() == 'iphone x') {
    deviceHeight = deviceHeight - 70
}
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
        fontSize: normalize(18),
    },
    inputLabelFocused: {
        width: 0,
        fontSize: normalize(13),
    },

    listHeader: {
        backgroundColor:ColorScheme.listItemHeader
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
        color: ColorScheme.regular
    },
    headerLabel: {
        color: '#292929',
        fontSize: normalize(14),
        marginLeft: 7
    },
    balanceHeader: {
        textAlign: 'center',
        fontFamily:'Roboto_light',
        color: ColorScheme.light,
        fontSize: normalize(13)
    },
    listItem: {
        padding: 15,
        backgroundColor: ColorScheme.listItemBackground,
        flex: 1,
        flexDirection: 'row',
        minHeight: 45,
        borderBottomColor: ColorScheme.listItemBorderColor,
        borderBottomWidth: 1
    },
    itemLabel: {
        color: ColorScheme.regular,
        fontSize: normalize(14),
        fontFamily: 'Roboto_light',
        textAlign: 'left',
        alignSelf: 'stretch',
        backgroundColor: 'transparent'
    },
    itemLabelDark: {
        color: ColorScheme.darkest,
    },
    itemLabelLight: {
        color: ColorScheme.light
    },

    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        fontSize: normalize(16),
        color: ColorScheme.regular,
        fontFamily: 'Roboto_light'
    },

    balanceValueDark: {
        color: ColorScheme.listItemValueDark
    },

    profitValue: {
        fontSize: normalize(14)
    },

    balanceValueSmall: {
        fontSize: normalize(13),
    },

    labelSmallest: {
        fontSize:normalize(11)
    },

    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto_light',
        lineHeight: normalize(15.5),
        paddingLeft: 5,
        fontSize: normalize(10)
    },
    bold: {
        fontFamily: 'Roboto_medium'
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
        paddingLeft: 15,
        backgroundColor: 'transparent'
    },
    mainBalanceHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 15
    },
    mainBalanceContainer: {
        flex: 1,
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBalanceValue: {
        color: ColorScheme.darkest,
        fontSize: normalize(24),
        fontFamily: 'Roboto_light'
    },

    chatButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: ColorScheme.chatBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropShadow: {
        shadowOffset: {width: 0, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
        zIndex: 999
    },

    verticalSeparator: {
        width: 1,
        height: 45,
        marginTop: 20,
        backgroundColor: ColorScheme.listItemBorderColor
    },

    chatButtonIcon: {
        color: ColorScheme.chatIconColor,
        backgroundColor: 'transparent',
        fontSize: 45
    },

    mainBalanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto_light',
        color: ColorScheme.regular,
        paddingTop: normalize(13) / 5,
        paddingLeft: 5,
        fontSize: normalize(13),
    },

    datePickerContainer: {
        padding: 15,
        paddingTop: 10,
        paddingBottom: 0,
        marginBottom: 0,
        alignItems: 'center',
        backgroundColor: ColorScheme.datePickerBackground,
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.datePickerBorderColor
    },
    datePickerLabel: {
        fontSize: normalize(13),
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        backgroundColor: 'transparent'
    },
    datePickerBorder: {
        borderLeftWidth: 1,
        borderLeftColor: ColorScheme.datePickerBorderColor
    },
    datePickerStyles: {
        dateInput: {
            // marginRight: 0,
            borderWidth: 0,
            marginLeft: 5
        },
        dateText: {
            color: ColorScheme.calendarLabelColor,
            paddingBottom: 7,
            alignSelf: 'stretch',
            textAlign: 'right'
        }
    },

    calendarIcon: {
        color: ColorScheme.calendarIconColor,
        position: 'absolute',
        left: 0,
        top: 3,
        fontSize: 36,
        marginLeft: 0
    },

    dayLabel: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: normalize(16),
        color: ColorScheme.darkest
    },
    monthLabel: {
        textAlign: 'center',
        color: ColorScheme.light,
        fontSize: normalize(12)
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor:ColorScheme.listItemBorderColor
    },
    buttonsContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        marginTop:15
    },
    profitHistoryContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 0,
        paddingRight: 15,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderLeftWidth: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        backgroundColor: ColorScheme.iconContainerBackground,
        borderRadius: 42
    },

    transactionsContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 0,
        marginLeft:0,
        paddingLeft:0,
        paddingRight: 15,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ColorScheme.listItemBackground
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

    textWin: {
        color: ColorScheme.win
    },
    textLoss: {
        color: ColorScheme.loss
    },
    textDraw: {
        color: ColorScheme.draw
    },
    buttonLabel: {
        textAlign: 'center',
        flex: 1,
        fontSize: 16
    },

    statusLabel: {
        backgroundColor: 'transparent',
        color: ColorScheme.neutralLight,
        fontSize: 10,
        fontFamily: 'Roboto_medium'
    },

    statusContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 1,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15
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
    confirmed: {
        backgroundColor: ColorScheme.confirmed
    },
    pending: {
        backgroundColor: ColorScheme.pending
    },
    rejected: {
        backgroundColor: ColorScheme.rejected
    },
    failed: {
        backgroundColor: ColorScheme.failed
    },
    authorized: {
        backgroundColor: ColorScheme.authorized
    },
    changed: {
        backgroundColor: ColorScheme.changed
    },
    inspected: {
        backgroundColor: ColorScheme.inspected
    },
    revoked: {
        backgroundColor: ColorScheme.revoked
    },


    stepHeader: {
        textAlign: 'center',
        fontSize: normalize(24),
        fontWeight: '700',
        paddingBottom: 50,
        color: ColorScheme.stepHeader
    },
    formLabel: {
        fontFamily: 'Roboto_light',
        fontSize: normalize(13)
    },
    cardContainer: {
        position: 'relative',
        paddingTop: 15,
        paddingBottom: 5,
        width: deviceWidth,
        minHeight: deviceHeight - 62,
        // minHeight:deviceHeight - 90,
        alignSelf: 'stretch',
        opacity: 1
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker,
        marginLeft: 0,
        minHeight: 45
    },
    pickerStyle: {
        width: '100%',
        height: 45,
        paddingLeft: 0,
        paddingRight: 0,
        opacity: 1
    },
    form: {
        minHeight: 45,
        padding: 0
    },
    inputField: {
        flex: 1,
        fontSize: normalize(18),
        paddingLeft: 0,
        paddingBottom: 5,
        paddingRight: 0,
        lineHeight: 24,
        textAlign:'left',
        color: ColorScheme.darkest
    },
    amountInput: {
        textAlign: 'left',
        paddingRight: 15
    },
    amountCurrency: {
        fontFamily: 'Roboto_light',
        color: ColorScheme.dark,
        fontSize: normalize(18),
        textAlign: 'right',
        paddingTop: 10,
        lineHeight: 20
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCenter: {
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    confirmMessage: {
        textAlign: 'center',
        fontSize: normalize(22),
        fontFamily: 'Roboto_bold'
    },
    successIcon: {
        color: ColorScheme.win,
        fontSize: normalize(45),
        marginBottom: 10
    },
    errorIcon: {
        color: ColorScheme.loss,
        fontSize: normalize(45),
        marginBottom: 10
    },
    cancelIcon: {
        color: ColorScheme.draw,
        fontSize: normalize(45),
        marginBottom: 10
    },
    confirmationHeader: {
        paddingBottom:30
    },

    confirmationText: {
        fontFamily: 'Roboto_light',
        fontSize: normalize(14),
        color: ColorScheme.regular,
        textAlign: 'center',
        marginTop: 12,
        marginBottom:12,
    },
    noResults: {
        textAlign: 'center',
        padding: 15,
        alignSelf: "stretch",
        fontFamily: 'Roboto_light',
        backgroundColor:ColorScheme.listItemBackground,
        borderBottomWidth:1,
        borderBottomColor:ColorScheme.listItemBorderColor
    },
    tabsStyle: {
        activeTintColor: ColorScheme.tabActiveColor,
        inactiveTintColor: ColorScheme.tabInactiveColor,
        labelStyle: {
            fontSize: normalize(12),
            fontFamily: 'Roboto_medium'
        },
        style: {
            backgroundColor: ColorScheme.tabsBackground,
        },
        indicatorStyle: {
            backgroundColor: ColorScheme.tabsIndicator
        }
    },
    welcomeContainer: {
        width: '100%',
        justifyContent:'center',
        alignItems: 'center'
    },
    welcomeBackMessage: {
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: normalize(22),
        fontWeight: '700',
        color: ColorScheme.darkest
    },
    pinView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:ColorScheme.mainBackground,
        paddingTop: Constants.statusBarHeight
    },
    pinBoxContainer: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30
    },
    pinBox: {
        borderWidth: 1,
        borderColor: ColorScheme.darkest,
        borderRadius: 16,
        height: 16,
        width: 16,
        marginRight: 28
    },

    pinBoxFilled: {
        backgroundColor: ColorScheme.darkest
    },

    pinKeyboard: {
        flex: -1,
        flexShrink: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pinKey: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth / 3,
        height: 70,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        backgroundColor:'#fff',
        flexGrow: 1,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0
    },

    pinKeyAction: {
        backgroundColor: '#f8f8f8'
    },

    pinKeyEmpty: {
        backgroundColor: 'rgb(239, 239, 244)',
    },
    pinPromptText: {
        marginTop: 45,
        color: ColorScheme.regular,
        marginBottom:15,
        fontSize: normalize(14)
    },
    addContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 25,
        paddingBottom: 25
    },
    addAccountIcon: {
        fontSize: normalize(26),
        color: ColorScheme.darkest,
        textAlign: 'center'
    },
    addMoreLabel: {
        fontSize: normalize(14),
        color: ColorScheme.darkest
    },
    BTC: {
        backgroundColor:ColorScheme.BTC
    },
    USD: {
        backgroundColor:ColorScheme.USD
    },
    GBP: {
        backgroundColor:ColorScheme.GBP
    },
    EUR: {
        backgroundColor:ColorScheme.EUR
    },
    P: {
        backgroundColor:ColorScheme.P
    },
    INR: {
        backgroundColor:ColorScheme.INR
    },
    CNY: {
        backgroundColor:ColorScheme.CNY
    }


};