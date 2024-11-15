import { HttpBackendOptions } from 'i18next-http-backend';
import {
  makeObservable, observable, action, runInAction,
} from 'mobx';

import { ConfigStore, CoreStore, useLazyStoreInstanceOrCreate } from 'stores';
import i18n from 'utils/Common/i18n';
import config from '../../../../public/config.json';

export class LanguageStore {
  private readonly coreStore: CoreStore;

  @observable language: string = 'en';

  @observable languageOptions: string[] = ['en', 'de'];

  @observable isTranslationsLoaded: boolean = false;

  constructor(coreStore: CoreStore) {
    this.coreStore = coreStore;
    makeObservable(this);
  }

  setStorageLanguage = () => {
    localStorage.setItem('language', this.language);
  };

  @action
    changeLanguage = (language: string) => {
      this.language = this.languageOptions.find((lo) => lo === language) as string;
      try {
        i18n.changeLanguage(this.language);
        localStorage.setItem('language', '"' + this.language + '"');
      } catch (err) {
        //
      }
    };

  @action
    setTranslationsLoaded = (isLoaded: boolean) => {
      this.isTranslationsLoaded = isLoaded;
    };

  private getStorageLanguage = () => {
    const storageLang = localStorage.getItem('language');
    if (storageLang) {
      runInAction(() => {
        this.changeLanguage(storageLang);
      });
    } else {
      runInAction(() => {
        this.language = this.languageOptions[0];
      });
    }
  };

  init = async () => {
    const configStore = (this.coreStore.lazyStoreRegistry._stores.configStore as ConfigStore);
    const supportedLanguages = config.supportedLanguages;
    const options = {
      'lookupQuerystring': 'lang',
      'supportedLngs': supportedLanguages,
    };
    await i18n.init<HttpBackendOptions>({
      backend: {
        loadPath: '/{{lng}}/{{ns}}.json',
        allowMultiLoading: true,
      },
      lng: 'en',
      fallbackLng: 'en',
      ns: ['translation'],
      defaultNS: 'translation',
      debug: false,
      detection: options,
      supportedLngs: supportedLanguages,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    }).then(() => {
      this.setTranslationsLoaded(true);
      this.getStorageLanguage();

      if (configStore?.language !== 'en') {
        this.changeLanguage(configStore?.language);
      }
    });
  };
}

export const languageStoreGetter = (coreStore: CoreStore) => new LanguageStore(coreStore);

export const useLanguageStore = () =>
  useLazyStoreInstanceOrCreate<LanguageStore>({
    storeName: 'languageStore',
    storeGetter: languageStoreGetter,
  });