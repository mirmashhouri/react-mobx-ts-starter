import type { EndpointFunc } from 'api/EndpointClass';

export type IResourcesUrlApi = {
  getResourcesUrl: EndpointFunc<{}, string>
};
