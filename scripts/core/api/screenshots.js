// @flow

import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';

class ScreenshotsAPI extends (BaseAPI) {
  screenshotCreate = (
    address: string,
    delay: number,
    dimension: string,
    browser: string,
    organization: number,
  ) => {
    const post = {
      address, delay, dimension, browser, organization,
    };
    const fullUrl = `${serverUrl}/screenshots/screenshot/`;
    return this.post(
      fullUrl,
      post,
    ).then(data => data.data);
  }
}

export { ScreenshotsAPI };
