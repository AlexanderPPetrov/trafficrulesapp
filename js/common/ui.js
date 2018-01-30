const React = require("react-native");
import ColorScheme from "./colorscheme";

const {StyleSheet, Dimensions, Platform, PixelRatio } = React;
const {
    width: deviceWidth,
    height: deviceHeight,
} = Dimensions.get('window');

const scale = deviceWidth / 320;

export function normalize(size) {
    size = size*scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}

export default {
    container: {
        backgroundColor:'#2b2b2b'
    },
    listHeader: {
        backgroundColor: ColorScheme.darker,
        height:45,
        justifyContent: 'center',
        paddingLeft:15,
        borderBottomWidth: 2,
        borderBottomColor: ColorScheme.info
    },
    listHeaderExtended: {
        backgroundColor: ColorScheme.darker                                                                                                                                                           ,
        height:50,
        paddingLeft:10
    },
    listHeaderLabel: {
        fontSize:14,
        color: '#ececec',
    },
    headerIcon: {
        color: '#ececec'
    },
    headerLabel: {
        color: '#ececec',
        fontSize: normalize(13),
        marginLeft: 7
    },
    listItem: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorScheme.neutralLight,
        flex: 1,
        flexDirection: 'row',
        maxHeight:78,
        minHeight:40
    },
    itemLabel: {
        color: ColorScheme.darker,
        fontSize: normalize(13),
        fontFamily:'Roboto_light',
        textAlign:'left',
        alignSelf: 'stretch'
    },
    balanceValue: {
        textAlign: 'right',
        alignSelf: 'stretch',
        fontSize:normalize(18),
        color:ColorScheme.darkest,
        fontFamily:'Roboto_light'
    },
    balanceValueSmall: {
        fontSize:16,
    },
    balanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily:'Roboto_light',
        color: ColorScheme.darker,
        paddingTop:normalize(10)/4,
        paddingLeft:5,
        fontSize:normalize(10)
    },
    currencyWidth: {
        width:30
    },
    cardHeader: {
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        fontSize: 15,
        lineHeight: 15,
        paddingTop: 15,
        paddingLeft: 15
    },
    mainBalanceValue: {
        color: ColorScheme.darkest,
        fontSize: normalize(22),
        textAlign: 'right',
        fontFamily: 'Roboto_light',
        flex: 1,
        paddingLeft:15
    },
    mainBalanceCurrency: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily:'Roboto_light',
        color: ColorScheme.darker,
        paddingTop:normalize(13)/5,
        paddingLeft:5,
        fontSize:normalize(13),
        paddingRight:15
    },
    datePickerContainer: {
        padding:15,
        paddingTop:10,
        paddingBottom:0,
        marginBottom:0
    },
    datePickerLabel: {
        fontSize:13,
        color: ColorScheme.light,
        fontFamily:'Roboto_light',
        backgroundColor:'transparent'
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
            borderWidth:0
        },
        dateText: {
            color:ColorScheme.dark
        }
    },
    calendarIcon:{
        color:ColorScheme.light
    },
    formContainer: {
        flex:1,
        justifyContent: 'space-between'
    },
    buttonsContainer: {
        alignSelf:'flex-end',
        justifyContent: 'space-between',
        width:'100%'
    },

    stepHeader: {
        textAlign:'center',
        fontSize:18,
        padding:10,
        paddingBottom:45,
        color:ColorScheme.darkest
    },
    formLabel:{
        color: ColorScheme.light,
        fontFamily: 'Roboto_light',
        marginBottom:10,
        fontSize: 14
    },
    cardContainer:{
        padding:30,
        paddingTop:15,
        paddingBottom:30,
        width:deviceWidth - 6,
        minHeight:deviceHeight - 92,
        // minHeight:deviceHeight - 90,
        alignSelf:'stretch',
        opacity:1
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker,
        marginLeft:0,
        minHeight:50
    },
    form: {
        minHeight:50,
        padding:0
    },
    inputField: {
        flex:1,
        fontSize:18,
        lineHeight: 24,
        color:ColorScheme.darkest
    },
    amountInput: {
        textAlign:'right',
        fontSize:36
    },
    amountCurrency: {
        fontFamily:'Roboto_light',
        color: ColorScheme.darker,
        fontSize:20,
        paddingTop:8,
        lineHeight:20,
        marginLeft:10
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    successIcon: {
        color:ColorScheme.win,
        fontSize:45,
        marginBottom:10
    },
    errorIcon: {
        color:ColorScheme.loss,
        fontSize:45,
        marginBottom:10
    },
    cancelIcon: {
        color:ColorScheme.neutralDarkest,
        fontSize:45,
        marginBottom:10
    },
    confirmationHeader:{

    },

    confirmationText: {
        fontFamily:'Roboto_light',
        fontSize:16,
        color: ColorScheme.light,
        textAlign:'center',
        marginTop:15
    },

    tabsStyle: {
        activeTintColor: ColorScheme.neutralLight,
        inactiveTintColor : ColorScheme.neutralDark,
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: ColorScheme.dark,
        },
        indicatorStyle:{
            backgroundColor:ColorScheme.info
        }
    }


};