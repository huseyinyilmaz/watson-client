// @flow strict

import axios from 'axios';
import * as queryString from 'query-string';

import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';
import { normalizeAPISession } from './utils';
import type {
  Session,
  SignupInput,
} from '../types';

class AccountsAPI extends (BaseAPI) {
  sessionCreate = (email: string, password: string) => {
    const post = { email, password };
    const fullUrl = `${serverUrl}/accounts/sessions/`;
    return axios.post(
      fullUrl,
      post,
    ).then(data => data.data);
  }

  sessionGet = (project: ?number): Promise<Session> => {
    const fullUrl = `${serverUrl}/accounts/sessions/`;
    let p = '';
    if (project) {
      p = queryString.stringify({ project });
    }
    return this.get(`${fullUrl}?${p}`).then(data => normalizeAPISession(data.data));
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

  projectDelete = (project: number) => {
    const fullUrl = `${serverUrl}/accounts/projects/${project}`;
    console.log('deleteing');
    return this.delete(fullUrl).then(data => data).catch(ex => ex.response.data);
  }

  // ///////////////////
  // Signup Endpoints //
  // ///////////////////

  signup = (data: SignupInput) => {
    const fullUrl = `${serverUrl}/accounts/signup/`;
    return this.post(fullUrl, data);
  }
}

export { AccountsAPI };
