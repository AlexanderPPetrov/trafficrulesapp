const React = require("react-native");
import ColorScheme from "./colorscheme";

const {StyleSheet, Dimensions, Platform, PixelRatio } = React;
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    size = size*scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}

export default {
    listHeader: {
        backgroundColor: ColorScheme.neutralDark,
        height:45,
        justifyContent: 'center',
        paddingLeft:15,
        borderBottomWidth: 1,
        borderBottomColor: ColorScheme.neutralDarker
    },
    listHeaderExtended: {
        backgroundColor: ColorScheme.neutralDark                                                                                                                                                           ,
        height:50,
        paddingLeft:10
    },
    listHeaderLabel: {
        fontSize:14,
        color: ColorScheme.neutralDarkest,
    },
    listItem: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorScheme.neutralLight,
        flex: 1,
        flexDirection: 'row',
        maxHeight:78
    },
    balanceLabel: {
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
    }
};