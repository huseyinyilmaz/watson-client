// @flow strict

import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';
import { PageResponse } from './response';

class ScreenshotsAPI extends (BaseAPI) {
  // ///////////////////////
  // Screenshot endpoints //
  // ///////////////////////
  screenshotSnapshotCreate = (
    url: string,
    delay: number,
    device: string,
    script: string,
    project: number,
  ) => {
    const post = {
      url, delay, device, project, script,
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
    return this.get(fullUrl, { params }).then(data => new PageResponse(data.data, this, a => a));
  }

  screenshotDelete = (screenshot: string) => {
    const fullUrl = `${serverUrl}/accounts/screenshots/${screenshot}`;
    return this.delete(fullUrl).then(data => data).catch(ex => ex.response.data);
  }
}

export { ScreenshotsAPI };
