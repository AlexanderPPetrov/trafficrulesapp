import { NavigationActions } from 'react-navigation';
import _ from "lodash";
import NotificationsButton from './js/common/notifications/notificationsbutton'
let _navigator;
let _pinModal;
let _sidebar;

import ColorScheme from './js/common/colorscheme'
import BetDetailsModal from './js/common/betdetails/betdetailsmodal'
import Api from "./Api";

let Controller = {

    selectedNotification: null,
    currentRoute:'',
    previousRoute:'',
    unreadNotifications: [],
    notificationTypes: {
        deposit:{
            name: 'ios-card',
            backgroundColor: ColorScheme.notificationDeposit,
            action:'Transactions'
        },
        withdraw: {
            name: 'ios-cash',
            backgroundColor: ColorScheme.notificationWithdraw,
            action:'Transactions'
        },
        weekly_status: {
            name: 'ios-stats',
            backgroundColor: ColorScheme.notificationWeeklyStatus,
            action:'WeeklyStatus'
        },
        funds_transfer: {
            name: 'ios-swap',
            backgroundColor: ColorScheme.notificationFundsTransfer
        },
        brokerage_activity: {
            name: 'ios-briefcase',
            backgroundColor: ColorScheme.notificationBrokerageActivity,
            action:'Brokerage'
        },
        bop_activity: {
            name: 'ios-briefcase',
            backgroundColor: ColorScheme.notificationBopActivity
        },
        betting_tips: {
            name: 'ios-bulb',
            backgroundColor: ColorScheme.notificationBettingTips
        },
        ad_hoc: {
            name:'ios-information-circle',
            backgroundColor: ColorScheme.notificationAdHoc
        }
    },

    setPinModal: pinModal => {
        _pinModal = pinModal;
    },

    showPinModal: (pin, success, reset) => {
        _pinModal.show(pin, success, reset)
    },

    hidePinModal: () => {
        _pinModal.hide()
    },

    setNavigator: navigator => {
        _navigator = navigator;
    },

    setSidebar: sidebar => {
        _sidebar = sidebar;
    },

    addNotification: notification => {
        Controller.unreadNotifications.push(notification)
        Controller.unreadNotifications = _.uniqBy(Controller.unreadNotifications, 'data.id')
        NotificationsButton.setUnreadNotifications(Controller.unreadNotifications.length);

    },

    removeNotification: id => {
        let remainingNotifications = Controller.unreadNotifications.filter((notification) => {
            if (notification.data.id !== id) return notification;
        });
        Controller.unreadNotifications = remainingNotifications;
        NotificationsButton.setUnreadNotifications(Controller.unreadNotifications.length)
    },

    removeAllNotifications: () => {
        Controller.unreadNotifications = [];
        NotificationsButton.setUnreadNotifications(Controller.unreadNotifications.length)
    },

    handleNotification: notification => {
        let data = notification;
        if(notification.data && notification.data.length > 0) {
            data = Api.decrypt(notification.data)
        }
        const action = Controller.notificationTypes[notification.type].action;
        if(action === 'Brokerage'){
            Controller.navigateTo('MyAccount')
            BetDetailsModal.show(notification.created_at)
        }else{
            Controller.navigateTo(Controller.notificationTypes[notification.type].action, data)
        }
    },

    updateSideBar: language => {

        if(_sidebar) _sidebar.changeLanguage(language)
        if(_navigator) _navigator.forceUpdate()
    },

    goBack: () => {
        Controller.navigateTo(Controller.previousRoute)
    },

    drawerNavigateTo: (routeName, params) => {
        Controller.navigateTo('DrawerClose')

        setTimeout(function(){
            Controller.navigateTo(routeName, params)
        }, 500);
    },

    navigateTo: (routeName, params) => {
        //Skip drawer open
        if(routeName !== 'DrawerOpen') {
            Controller.previousRoute = Controller.currentRoute;
            Controller.currentRoute = routeName;
        }

        _navigator.dispatch(
            NavigationActions.navigate({
                type: 'Navigation/NAVIGATE',
                routeName,
                params
            }),
        );
    }
}

export default Controller;
