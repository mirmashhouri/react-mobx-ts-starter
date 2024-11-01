import { ICoreStore } from 'stores';

export declare interface ILazyStoreRegistry {
  get<LazyStore>(
    storeName: string
  ): LazyStore | null | undefined;
  set<LazyStore>(storeName: string, lazyStoreGetter: (coreStore: ICoreStore) => LazyStore): void;
  getOrSetAndReturn<LazyStore>(storeName: string, storeGetter: (coreStore: ICoreStore) => LazyStore): LazyStore;
}