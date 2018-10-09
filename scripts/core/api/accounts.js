// @flow

import axios from 'axios';
import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';

class AccountsAPI extends (BaseAPI) {
  sessionCreate = (email: string, password: string) => {
    const post = { email, password };
    const fullUrl = `${serverUrl}/accounts/sessions/`;
    return axios.post(
      fullUrl,
      post,
    ).then(data => data.data);
  }

  sessionGet = () => {
    const fullUrl = `${serverUrl}/accounts/sessions/`;
    return this.get(fullUrl).then(data => data.data);
  }

  sessionDelete = () => {
    const sessionToken = this.getToken();
    if (sessionToken) {
      const fullUrl = `${serverUrl}/accounts/sessions/${sessionToken}/`;
      return this.delete(fullUrl).then(data => data.data);
    }
    return Promise.reject(new Error('User is not logged in.'));
  }

  // /////////////////////
  // Organizations apis //
  // /////////////////////
  organizationsGet = () => {
    const fullUrl = `${serverUrl}/accounts/organizations/`;
    return this.get(fullUrl).then(data => data.data.results);
  }
}

export { AccountsAPI };
