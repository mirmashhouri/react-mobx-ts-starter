import { Endpoint } from 'api/EndpointClass';
import type { IResourcesUrlApi } from './types';

export const ResourcesUrlApi: IResourcesUrlApi = {
  getResourcesUrl: new Endpoint('get', 'getResourcesUrl').hasHeaders().build(),
};
