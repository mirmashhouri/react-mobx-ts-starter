import { Endpoint } from 'api/EndpointClass';

import { ILocalConfigApi } from './types';

export const LocalConfigApi: ILocalConfigApi = {
  loadLocalConfig: new Endpoint('get', 'config.json', location.origin).build(),
};
