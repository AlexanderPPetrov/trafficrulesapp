import { NavigationActions } from 'react-navigation';

let _navigator;
let _pinModal;
let _sidebar;


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

    updateSideBar: language => {
        _sidebar.changeLanguage(language)
        _navigator.forceUpdate()
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
