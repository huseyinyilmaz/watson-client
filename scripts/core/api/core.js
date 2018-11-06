// @flow strict

import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';

class CoreAPI extends (BaseAPI) {
  constantsGet = () => {
    const fullUrl = `${serverUrl}/core/constants/`;
    return this.get(fullUrl).then(data => data.data);
  }
}

export { CoreAPI };
