import I18n from 'ex-react-native-i18n';
import back from './locales/back';
// import fr from './locales/fr';
I18n.defaultLocale = 'back';
I18n.fallbacks = true;
I18n.availableLocales = {
    en: "English"
}
I18n.translations = {
    back
    // fr
};
export default I18n;
