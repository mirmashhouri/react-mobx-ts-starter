/* eslint-disable no-console */
import { useCoreStore, CoreStore, ILazyStoreRegistry } from 'stores';

export class LazyStoreRegistry implements ILazyStoreRegistry {
  _stores: Record<string, Object> = {};

  private _coreStore: CoreStore;

  constructor(coreStore: CoreStore) {
    this._coreStore = coreStore;
  }

  get<LazyStore>(storeName: string) {
    if (this._stores[storeName]) {
      return this._stores[storeName] as LazyStore;
    }
    return null;
  }

  set<LazyStore>(
    storeName: string,
    storeGetter: (coreStore: CoreStore) => LazyStore,
  ) {
    const store = storeGetter(this._coreStore);
    // Use this peice of code for testing purposes
    if (this._stores[storeName] != undefined || this._stores[storeName] != null) {
      // console.log(`store injected: "${storeName}"`);
    }
    this._stores[storeName] = store as Object;
  }

  getOrSetAndReturn<LazyStore>(
    storeName: string,
    storeGetter: (CoreStore: CoreStore) => LazyStore,
  ): LazyStore {
    const previouslyInstantiatedStore = this.get(storeName);
    if (previouslyInstantiatedStore) {
      // Use this peice of code for testing purposes
      if (storeName === 'storeName') {
        // console.log(
        //   `LazyStoreRegistry - store with the name "${storeName}" detected. Using existing instance.`,
        // );
      }
      return previouslyInstantiatedStore as LazyStore;
    }

    // Use this peice of code for testing purposes
    // console.log(
    //   `LazyStoreRegistry - store with the name "${storeName}" not detected. Creating a new instance from the getter method.`,
    // );

    this.set(storeName, storeGetter);
    return this.get(storeName) as LazyStore;
  }
}

export const useLazyStoreInstanceOrCreate = <LazyStore>(opts: {
  storeName: string;
  storeGetter: (coreStore: CoreStore) => LazyStore;
}): LazyStore => {
  const coreStore = useCoreStore();
  return coreStore?.lazyStoreRegistry.getOrSetAndReturn(
    opts.storeName,
    opts.storeGetter,
  );
};
