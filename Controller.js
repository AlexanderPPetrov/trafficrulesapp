import { NavigationActions } from 'react-navigation';

let _navigator;
let _pinModal;
let _sidebar;


let Controller = {

    redirectScreen: '',
    notificationData: {},
    unreadNotifications: [],

    setPinModal: (pinModal) => {
        _pinModal = pinModal;
    },

    showPinModal: (pin, success, reset) => {
        _pinModal.show(pin, success, reset)
    },

    hidePinModal: () => {
        _pinModal.hide()
    },

    setNavigator: (navigator) => {
        _navigator = navigator;
    },

    setSidebar: (sidebar) => {
        _sidebar = sidebar;
    },

    updateSideBar: (language) => {
        _sidebar.changeLanguage(language)
        _navigator.forceUpdate()
    },

    navigateTo: (routeName, params) => {
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