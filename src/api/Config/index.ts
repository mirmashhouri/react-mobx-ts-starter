import { Endpoint } from 'api/EndpointClass';
import type { IConfigApi } from './types';

export const ConfigApi: IConfigApi = {
  getConfig: new Endpoint('get', 'config').hasHeaders().build(),
};
