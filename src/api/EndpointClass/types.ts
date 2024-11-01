export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'connect' | 'options';

export type LooseObject = Record<string, any>;

export type EndpointFunc<RequestData = undefined, ResponseData = undefined> = (data?: RequestData) => Promise<ResponseData>;
