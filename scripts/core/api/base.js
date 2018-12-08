// @flow strict

import axios from 'axios';

import type { EnvironmentConfig } from '../config/types';
import { sessionStore } from '../store';

class BaseAPI {
  serverUrl: string

  environment: EnvironmentConfig

  getSession = sessionStore.get

  getAuthHeaders = (): {} => {
    const session = this.getSession();
    if (session) {
      const { token } = session;
      return { Authorization: `TOKEN ${token}` };
    } else {
      return {};
    }
  }

  get(url: string, extraConfig: {} = {}): * {
    const authHeaders = this.getAuthHeaders();
    const config = {
      headers: authHeaders,
      ...extraConfig,
    };
    return axios.get(url, config);
  }

  post(url: string, data: {}): * {
    const authHeaders = this.getAuthHeaders();
    const config = { headers: authHeaders };
    return axios.post(url, data, config);
  }

  delete(url: string): * {
    const authHeaders = this.getAuthHeaders();
    const config = { headers: authHeaders };
    return axios.delete(url, config);
  }
}

export { BaseAPI };
