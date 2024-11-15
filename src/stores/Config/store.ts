import {
  action,
  makeObservable,
  observable,
} from 'mobx';

import i18n from 'utils/Common/i18n';
import {
  initialConfig,
  CoreStore,
  useLazyStoreInstanceOrCreate,
} from 'stores';
import {
  IConfigResponse,
} from './types';


export class ConfigStore {
  private readonly coreStore: CoreStore;

  @observable queryParams: URLSearchParams;

  @observable config: IConfigResponse = initialConfig;

  @observable language: string = 'en';

  @observable theme: string = '';

  @observable defaultLocale: string = 'en';

  constructor(coreStore: CoreStore) {
    this.coreStore = coreStore;

    this.queryParams = new URLSearchParams(location.search.substring(1));
    this.setObservables();

    makeObservable(this);

  }


  @action
    setConfig = (config: IConfigResponse) => {
      this.config = config;
      this.setObservables();
    };


  @action
    setObservables = () => {
      this.theme = this.config.theme;
      this.defaultLocale = this.config.defaultLocale;
      this.language = this.queryParams.get('language') ? this.queryParams.get('language')! : 'en';

      if (!localStorage.getItem('language')) {
        try { // throws internal i18n exception when run in tests
          if (this.language === 'en') {
            i18n.changeLanguage(this.defaultLocale);
          } else {
            i18n.changeLanguage(this.language);
          }
        } catch (err) {
          //
        }
      }
    };
}

export const configStoreGetter = (coreStore: CoreStore) => new ConfigStore(coreStore);

export const useConfigStore = () =>
  useLazyStoreInstanceOrCreate<ConfigStore>({
    storeName: 'configStore',
    storeGetter: configStoreGetter,
  });