// @flow

import axios from 'axios';
import * as queryString from 'query-string';

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

  sessionGet = (organization: ?number, project: ?number) => {
    const fullUrl = `${serverUrl}/accounts/sessions/`;
    let p = '';
    if (organization || project) {
      const params = {};
      if (organization) {
        params.organization = organization;
      }
      if (project) {
        params.project = project;
      }
      p = queryString.stringify(params);
    }

    return this.get(`${fullUrl}?${p}`).then(data => data.data);
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


  // ////////////////////
  // Project Endpoints //
  // ////////////////////

  projectsGet = (organization: number) => {
    const fullUrl = `${serverUrl}/accounts/projects/`;
    const params = { organization };
    return this.get(fullUrl, { params }).then(data => data.data.results);
  }

  projectCreate = (
    name: string,
    organization: number,
  ) => {
    const post = {
      name, organization,
    };
    const fullUrl = `${serverUrl}/accounts/projects/`;
    return this.post(
      fullUrl,
      post,
    ).then(data => data.data);
  }
}

export { AccountsAPI };
