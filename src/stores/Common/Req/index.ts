import {
  makeObservable, observable, action, runInAction,
} from 'mobx';

/**
 * A small class for defining requests in a store.
 *
 * Functionality:
 * 1. sets `isLoading` to true, when the request start and to false when it finishes.
 * 2. Wraps the code in a try catch
 * 3. By deafult, it uses `console.error` to log if there are erros.
 * 4. Ability to provide a custom error handler if needed by passing another callback as a second parameter.
 * 5. Exposes the error as a property named `error`, if you don't need a callback for error handling.
 * `error` is null initially.
 *
 * Example:
 * ```js
 * getItems = new Req(async (id) => {
 *   const response = await api.getItems(id);
 *
 *   runInAction(() => {
 *     this.items = response.data;
 *   })
 * })
 *
 * // later
 *
 * getItems.request(id) // will call the callback function
 * getItems.isLoading   // boolean
 * getItems.error       // null initially
 * ```
 */
export class Req<Args extends any[], ReturnT extends any> {
  @observable isLoading: boolean = false;

  @observable error: any = null;

  logErrors: boolean = true;

  private _requestCallback: (...args: Args) => Promise<ReturnT>;

  private _errorCallback: ((err: any) => void);

  constructor(
    request: (...args: Args) => Promise<ReturnT>,
    onError?: (err: any) => void,
  ) {
    this._requestCallback = action(request);
    this._errorCallback = onError ? action(onError) : this._defaultOnError;

    makeObservable(this);
  }

  @action
  // eslint-disable-next-line consistent-return
    request = async (...params: Args) => {
      try {
        this.isLoading = true;
        const result = await this._requestCallback(...params);
        runInAction(() => {
          this.error = null;
        });
        return result;
      } catch (err) {
        this._errorCallbackWrapper(err);
      } finally {
        runInAction(() => {
          this.isLoading = false;
        });
      }
    };

  @action
  private _defaultOnError = (err: any) => {
      if (this.logErrors) console.error(err);
      this.error = err;
    };

  @action
  private _errorCallbackWrapper = (err: any) => {
      this._errorCallback(err);
      this.error = err;
    };
}
