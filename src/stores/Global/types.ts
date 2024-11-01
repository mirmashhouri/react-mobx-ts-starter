import {
  LanguageStore,
  ConfigStore,
  ScreenStore,
  NetworkStore,
  LayoutStore,
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

  screenStore: ScreenStore;

  networkStore: NetworkStore;

  layoutStore: LayoutStore;

  themeStore: ThemeStore;



  disposeAllEvents: () => void
}

/**
 * GlobalStore adds onto IEnvAgnosticStores, extending it with stores that must have a specific implementation for their environment
 */
export declare interface IGlobalStore
  extends IEnvAgnosticGlobalStores {}