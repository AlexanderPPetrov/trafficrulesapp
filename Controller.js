import { NavigationActions } from 'react-navigation';
import _ from "lodash";
import NotificationsButton from './js/common/notifications/notificationsbutton'
let _navigator;
let _pinModal;
let _sidebar;

const notifications = {

}

let Controller = {

    redirectScreen: '',
    notificationData: {},
    currentRoute:'',
    previousRoute:'',
    unreadNotifications: [],
    unseenNotifications:0,

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
        //TODO
        Controller.unreadNotifications.push(notification)
        Controller.unreadNotifications = _.uniqBy(Controller.unreadNotifications, 'data.id')
        NotificationsButton.addUnseenNotification();

    },

    removeNotification: id => {
        let remainingNotifications = Controller.unreadNotifications.filter((notification) => {
            if (notification.data.id !== id) return notification;
        });
        Controller.unreadNotifications = remainingNotifications;
        Controller.unseenNotifications = remainingNotifications.length;
        NotificationsButton.setUnseenNotifications(Controller.unseenNotifications)
    },

    removeAllNotifications: () => {
        Controller.unreadNotifications = [];
        Controller.unseenNotifications = 0;
        NotificationsButton.setUnseenNotifications(Controller.unseenNotifications)
    },

    handleNotification: notification => {

    },

    updateSideBar: language => {

        if(_sidebar) _sidebar.changeLanguage(language)
        if(_navigator) _navigator.forceUpdate()
    },

    goBack: () => {
        Controller.navigateTo(Controller.previousRoute)
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
