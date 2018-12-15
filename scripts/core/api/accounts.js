// @flow strict

import axios from 'axios';
import * as queryString from 'query-string';

import type { QueryParameters } from 'query-string';

import { BaseAPI } from './base';
import { serverUrl } from '../config/config.json';
import { normalizeAPISession } from './utils';

import type {
  Session,
  Signup,
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

  sessionGet = (args: ?QueryParameters) => {
    const fullUrl = `${serverUrl}/accounts/sessions/`;
    let p = '';
    if (args) {
      p = queryString.stringify(args);
    }
    // return this.get(`${fullUrl}?${p}`).then(data => normalizeAPISession(data.data.results[0]));
    return this.get(`${fullUrl}?${p}`).then(
      (data) => {
        const result = normalizeAPISession(data.data.results[0]);
        // debugger;
        return result;
      },
    );
  }

  sessionGetByProject = (project: number): Promise<Session> => (
    this.sessionGet({ project: project.toString() }));

  sessionGetByOrganization = (organization: number): Promise<Session> => (
    this.sessionGet({ organization: organization.toString() }));

  sessionDelete = () => {
    const session = this.getSession();
    if (session) {
      const { token: sessionToken } = session;
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

  organizationCreate = (
    name: string,
    company: string,
    location: string,
    email: string,
    url: string,
  ) => {
    const post = {
      name,
      company,
      location,
      email,
      url,
    };
    const fullUrl = `${serverUrl}/accounts/organizations/`;
    return this.post(
      fullUrl,
      post,
    ).then(data => data.data);
  }

  organizationDelete = (organization: number) => {
    const fullUrl = `${serverUrl}/accounts/organizations/${organization}`;
    return this.delete(fullUrl).then(data => data).catch(ex => ex.response.data);
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
    return this.delete(fullUrl).then(data => data).catch(ex => ex.response.data);
  }

  // ///////////////////
  // Signup Endpoints //
  // ///////////////////

  signup = (data: Signup) => {
    const fullUrl = `${serverUrl}/accounts/signup/`;
    return this.post(fullUrl, data);
  }
}

export { AccountsAPI };
