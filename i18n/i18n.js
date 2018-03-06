import I18n from 'ex-react-native-i18n';
import back from './locales/back';
I18n.defaultLocale = 'back';
I18n.fallbacks = true;
I18n.availableLocales = {
    en: "English"
}
I18n.translations = {
    back
};
export default I18n;
