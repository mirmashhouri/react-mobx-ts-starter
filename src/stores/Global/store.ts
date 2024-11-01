import { makeObservable, action } from 'mobx';

import {
  CoreStore,
} from 'stores';

export class GlobalStore {
  coreStore: CoreStore;

  constructor() {
    this.coreStore = new CoreStore(this, {
    });
    makeObservable(this);
  }

  @action
    disposeAllEvents = () => {
      this.coreStore.disposeAllEvents();
    };
}
