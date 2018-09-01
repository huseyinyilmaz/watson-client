import { getEnv } from './config';

const initialize = async (context) => {
  getEnv().then();
};

export { initialize };
