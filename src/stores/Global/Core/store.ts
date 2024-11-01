import React from 'react';
import {
  makeObservable, observable, action,
} from 'mobx';

import {
  GlobalStore,
  ICoreStore,
  LazyStoreRegistry,
  NetworkStore,
  ScreenStore,
  ThemeStore,
} from 'stores';

export class CoreStore implements ICoreStore {

  readonly globalStore: GlobalStore;

  public lazyStoreRegistry: LazyStoreRegistry;


  @observable prop: string = '';

  constructor(globalStore: GlobalStore, coreStoreConstructors: {
    lazyStoreRegistry?: (coreStore: CoreStore) => LazyStoreRegistry
  }) {
    this.globalStore = globalStore;
    this.lazyStoreRegistry = coreStoreConstructors.lazyStoreRegistry
      ? coreStoreConstructors.lazyStoreRegistry(this)
      : new LazyStoreRegistry(this);

    makeObservable(this);
  }

  @action
    disposeAllEvents = () => {
      (this.lazyStoreRegistry._stores?.themeStore as ThemeStore)?.disposeThemeStore();
      (this.lazyStoreRegistry._stores.networkStore as NetworkStore)?.dispose();
      (this.lazyStoreRegistry._stores.screenStore as ScreenStore)?.disposeScreenStore();
    };
}

export const CoreStoreProvider = React.createContext<ICoreStore>(
  (null as unknown) as ICoreStore,
);

export const useCoreStore = () => React.useContext(CoreStoreProvider);
