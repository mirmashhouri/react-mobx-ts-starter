import type { EndpointFunc } from 'api/EndpointClass';
import { IConfigResponse } from 'stores';

export type IConfigApi = {
  getConfig: EndpointFunc<{}, IConfigResponse>
};
