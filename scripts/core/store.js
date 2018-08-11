// @flow

// Global values that is needed on initialization.

import store from 'store';

const tokenStore = {
  get: () => store.get('sessionToken'),
  set: (sessionToken: string) => store.set('sessionToken', sessionToken),
  remove: () => store.remove('sessionToken'),
};

export { store, tokenStore };
