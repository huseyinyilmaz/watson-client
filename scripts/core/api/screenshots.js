// @flow

import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';

class ScreenshotsAPI extends (BaseAPI) {
  // ///////////////////////
  // Screenshot endpoints //
  // ///////////////////////
  screenshotSnapshotCreate = (
    url: string,
    delay: number,
    device: string,
    organization: number,
  ) => {
    const post = {
      url, delay, device, organization,
    };
    const fullUrl = `${serverUrl}/screenshots/screenshotsnapshot/`;
    return this.post(
      fullUrl,
      post,
    ).then(data => data.data);
  }

  screenshotSnapshotGet = (id: string) => {
    const fullUrl = `${serverUrl}/screenshots/screenshotsnapshot/${id}/`;
    return this.get(fullUrl).then(data => data.data);
  }

  screenshotSnapshotsGet = (organization: number) => {
    const fullUrl = `${serverUrl}/screenshots/screenshotsnapshot/`;
    const params = { organization };
    return this.get(fullUrl, { params }).then(data => data.data.results);
  }
}

export { ScreenshotsAPI };
