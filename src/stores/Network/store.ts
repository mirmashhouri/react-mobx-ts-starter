/* eslint-disable no-empty-pattern */
import {
  makeObservable, observable, action, reaction,
} from 'mobx';
import { CoreStore, Req, useLazyStoreInstanceOrCreate } from 'stores';

type IRequest = Req<[], void>;

export class NetworkStore {
  @observable isOnline = true;

  @observable isLoading = true;

  @observable retry = false;

  private coreStore: CoreStore;

  private _requests: IRequest[] = [];

  private _disposers: Map<IRequest, () => void> = new Map();

  constructor(coreStore: CoreStore) {
    this.coreStore = coreStore;
    makeObservable(this);
  }

  dispose = () => {
    this._disposers.forEach(disposer => disposer());
  };

  @action
    registerRequest = (req: IRequest) => {
      if (this._requests.indexOf(req) >= 0)
        return;

      this._requests.push(req);
      this._disposers.set(req, reaction(
        () => [req.isLoading, req.error],
        () => this.updateState(),
      ));
      this.updateState();
    };

  @action
  private updateState = () => {
      let hasLoading = false;
      let hasErrors = false;
      this._requests.forEach(req => {
        if (req.isLoading) hasLoading = true;
        if (req.error) hasErrors = true;
      });
      this.isLoading = hasLoading;
      this.isOnline = !hasErrors;

    };



}

export const networkStoreGetter = (coreStore: CoreStore) => new NetworkStore(coreStore);

export const useNetworkStore = () =>
  useLazyStoreInstanceOrCreate<NetworkStore>({
    storeName: 'networkStore',
    storeGetter: networkStoreGetter,
  });