// @flow strict

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
    project: number,
  ) => {
    const post = {
      url, delay, device, project,
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

  screenshotSnapshotsGet = (project: number) => {
    const fullUrl = `${serverUrl}/screenshots/screenshotsnapshot/`;
    const params = { project };
    return this.get(fullUrl, { params }).then(data => data.data.results);
  }
}

export { ScreenshotsAPI };
