import { action, observable } from 'mobx';
import i18next, { t } from 'i18next';

export class I18n {
  @observable
  lang = localStorage.getItem('i18nextLanguage') && localStorage.getItem('i18nextLanguage') === 'ko' ? 'ko' : 'en';
  langBefore;

  constructor() {
    this.initI18n();
  }

  initI18n() {
    i18next.init({
      lng: this.lang,
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
      require('../../locales/ko.json')
    );
  }

  get t() {
    this.langBefore = this.lang;
    return t;
  }

  @action
  changeLanguage = () => {
    this.lang = this.lang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('i18nextLanguage', this.lang);
    i18next.changeLanguage(this.lang);
  }
}

const i18n = new I18n();

export default i18n;
