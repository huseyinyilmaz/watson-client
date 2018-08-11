// @flow

import type { EnvironmentConfig } from './types';

const getEnv: (() => Promise<EnvironmentConfig>) = async () => {
  const env = process.env.NODE_ENV;
  if (env) {
    if (env === 'development') {
      return import('./development.json');
    } else {
      // XXX Remove this return
      return import('./development.json');
      // throw new Error(`Invalid environment type. ${env}`);
    }
  } else {
    throw new Error('Cannot get environment type.');
  }
};

export { getEnv };
