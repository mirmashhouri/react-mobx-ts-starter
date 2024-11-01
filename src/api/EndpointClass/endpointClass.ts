/* eslint-disable class-methods-use-this */
import { toast } from 'utils/ToastMessage';
import { throttle } from 'lodash';
import * as Helpers from './helpers';
import type { HttpMethod, LooseObject } from './types';

export class Endpoint {

  private method: string;

  private baseUrl: string;

  private endpoint: string;

  private url: string;

  private headers: LooseObject;

  private requestData: LooseObject;

  private body?: string | FormData;

  private notificationMsg: string = '';

  private transformCallback?: ((response: LooseObject) => {});

  private throttleWait?: number;

  private abortController?: AbortController;


  private flags = {
    isJsonRequest: false,
    isFormDataRequest: false,
    shouldTransformResponse: false,
    isThrottled: false,
    isCamelCase: false,
    isInitialized: false,
    hasToastMsg: false,
    hasHeaders: false,
    hasQuerryParams: true,
  };

  private cache?: RequestCache = 'default';

  constructor(method: HttpMethod, endpoint: string, baseUrl: string = '') {
    this.method = method.toUpperCase();
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
    this.url = '';
    this.requestData = {};
    this.headers = {};
    return this;
  }

  setCache(cache: RequestCache) {
    this.cache = cache;
    return this;
  }

  hasHeaders() {
    this.flags.hasHeaders = true;
    return this;
  }

  json() {
    this.flags.isJsonRequest = true;
    this.headers['Content-Type'] = 'application/json';
    return this;
  }

  formData() {
    this.flags.isFormDataRequest = true;
    return this;
  }

  msg(msg: string) {
    this.flags.hasToastMsg = true;
    this.notificationMsg = msg;
    return this;
  }

  removeQuerryParams() {
    this.flags.hasQuerryParams = false;

    return this;
  }

  transformResponse(callback: (response: any) => {}) {
    this.flags.shouldTransformResponse = true;
    this.transformCallback = callback;

    return this;
  }

  throttle(wait: number) {
    this.flags.isThrottled = true;
    this.throttleWait = wait;
    return this;
  }

  camelCase() {
    this.flags.isCamelCase = true;
    return this;
  }

  setAbortController(controller: AbortController) {
    this.abortController = controller;
    return this;
  }

  private formatRequestData(data: LooseObject) {
    this.requestData = data;

    if (this.flags.hasHeaders) {
      this.headers = { ...this.headers, ...this.requestData.headers };
      delete this.requestData.headers;
    }

    if (this.flags.isJsonRequest) {
      this.body = JSON.stringify(data);
    } else if (this.flags.isFormDataRequest) {
      this.body = this.handleFormData();
    } else {
      this.handlePlainText();
    }
  }


  private async urlSetup(data: Record<string, any>) {
    if (!this.flags.isInitialized) {
      this.flags.isInitialized = true;
    }

    this.url = `${this.baseUrl === '' ? window.apiEndpointUrl : this.baseUrl}/${this.endpoint}`;
    this.url = Helpers.replaceUrlPlaceholders(this.url, data);
    this.url = Helpers.removeDuplicateSlashes(this.url);
  }

  private handleToastMsg() {
    if (this.flags.hasToastMsg) {
      toast(this.notificationMsg);
    }
  }

  private handleResponseTransformer(response: LooseObject) {
    if (this.flags.shouldTransformResponse && this.transformCallback) {
      return this.transformCallback(response);
    }
    return response;
  }

  private handleFormData() {
    const formData = new FormData();
    Object.keys(this.requestData).forEach((key) => formData.append(key, this.requestData[key]));

    return formData;
  }

  private handlePlainText() {
    if (this.requestData) {
      const params = new URLSearchParams();

      Object.entries(this.requestData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else if (value) {
          params.append(key, value);
        }
      });

      this.url += `?${params}`;
    }
  }

  private handleCamelCase(response: LooseObject) {
    return this.flags.isCamelCase ? Helpers.keysToCamelCase(response) : response;
  }

  private async parseResponse(response: Response) {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  private async responseTransformers(response: Response) {
    let res;

    res = await this.parseResponse(response);
    res = this.handleResponseTransformer(res);
    res = this.handleCamelCase(res);

    return res;
  }

  private async makeRequest(data: LooseObject) {
    if (this.flags.hasQuerryParams) {
      await this.urlSetup(data);
    }
    this.formatRequestData(data);
    if (!this.flags.hasQuerryParams) {
      this.url = decodeURIComponent(this.url.split('=')[1]);
    }
    const {
      method, headers, url, body, abortController,
    } = this;

    const response = await fetch(url, {
      headers,
      method,
      body,
      signal: abortController?.signal,
      redirect: 'error',
      cache: this.cache,
    });

    if (response.ok) { this.handleToastMsg(); }

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (!response.ok) { throw response; }

    return response;
  }

  private async apiCall<RequestData = LooseObject>(data: RequestData) {
    try {
      const response = await this.makeRequest(data);
      return await this.responseTransformers(response);
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  build(): (RequestData?: Object | null) => any {
    if (this.flags.isThrottled) {
      return throttle(
        (data) => this.apiCall(data),
        this.throttleWait,
        { trailing: false },
      );
    }
    return (data) => this.apiCall(data);
  }
}
