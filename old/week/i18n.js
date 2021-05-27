import i18next, { t as trans } from 'i18next';

export const i18nInit = () => {
  i18next.init({
    lng: localStorage.getItem('i18nextLanguage') && localStorage.getItem('i18nextLanguage') === 'ko' ? 'ko' : 'en',
    fallbackLng: 'en',
    resources: {
      kr: {
        translation: {}
      }
    }
  });

  i18next.addResourceBundle(
    'ko',
    'translation',
    require('../locales/ko.json')
  );

  i18next.change = () => {
    const language = i18next.language === 'ko' ? 'en' : 'ko';
    localStorage.setItem('i18nextLanguage', language);
    i18next.changeLanguage(language);
  };

  i18next.on('languageChanged', () => {
    document.location.reload();
  });
};

export const i18nChange = () => {
  return i18next.change();
};

export const t = trans;

i18nInit();
