// @flow

import axios from 'axios';

import type { EnvironmentConfig } from '../config/types';
import { tokenStore } from '../store';

class BaseAPI {
  serverUrl: string

  environment: EnvironmentConfig

  getToken = tokenStore.get

  getAuthHeaders = (): ?{} => {
    const token = this.getToken();
    if (token) {
      return { Authorization: `TOKEN ${token}` };
    } else {
      return null;
    }
  }

  get(url: string) {
    const authHeaders = this.getAuthHeaders();
    const config = { headers: authHeaders };
    return axios.get(url, config);
  }

  post(url: string, data: {}) {
    const authHeaders = this.getAuthHeaders();
    const config = { headers: authHeaders };
    return axios.post(url, data, config);
  }

  delete(url: string) {
    const authHeaders = this.getAuthHeaders();
    const config = { headers: authHeaders };
    return axios.delete(url, config);
  }
}

export { BaseAPI };
