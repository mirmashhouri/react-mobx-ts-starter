import type { EndpointFunc } from 'api/EndpointClass';

export type ILocalConfigApi = {
  loadLocalConfig: EndpointFunc<
  undefined,
  any
  >
};
