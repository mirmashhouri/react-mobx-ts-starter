import {
  makeObservable, observable, action, computed,
} from 'mobx';
import { CoreStore, ScreenStore, useLazyStoreInstanceOrCreate } from 'stores';
import { TLayout } from './types';
export class LayoutStore {

  private readonly coreStore: CoreStore;

  @observable layout: TLayout = 'rows';

  constructor(coreStore: CoreStore) {
    this.coreStore = coreStore;
    this.setLayout((coreStore.lazyStoreRegistry._stores.screenStore as ScreenStore)
      ?.isMobilePortrait ? 'rows' : 'cols');
    makeObservable(this);
  }

  @computed
  get isCols() {
    return this.layout === 'cols';
  }

  @computed
  get layoutClass() {
    return (this.coreStore.lazyStoreRegistry._stores.screenStore as ScreenStore)?.isMobilePortrait
      ? this.layout
      : ( (this.coreStore.lazyStoreRegistry._stores.screenStore as ScreenStore) ?.isMobilePortrait
        ? 'rows'
        : 'cols'
      );
  }

  @action
    setLayout = (value: TLayout) => {
      this.layout = value;
    };
}

export const layoutStoreGetter = (coreStore: CoreStore) => new LayoutStore(coreStore);

export const useLayoutStore = () =>
  useLazyStoreInstanceOrCreate<LayoutStore>({
    storeName: 'layoutStore',
    storeGetter: layoutStoreGetter,
  });