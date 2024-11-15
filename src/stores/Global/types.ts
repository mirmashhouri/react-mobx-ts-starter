import {
  LanguageStore,
  ConfigStore,
  ThemeStore,
  LazyStoreRegistry,
} from 'stores';

/**
 * Env agnostic stores can be re-used in any environment
 */
export declare interface IEnvAgnosticGlobalStores {
  lazyStore: LazyStoreRegistry,

  languageStore: LanguageStore;

  configStore: ConfigStore;

  themeStore: ThemeStore;



  disposeAllEvents: () => void
}


export declare interface IGlobalStore
  extends IEnvAgnosticGlobalStores {}