import { getEnv } from './config';

const initialize = (context) => {
  getEnv().then();
};

export { initialize };
