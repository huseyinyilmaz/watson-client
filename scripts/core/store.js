// @flow strict

// Global values that is needed on initialization.

import store from 'store';

import type { ClientSession } from './types';

class SessionStore {
  // if there is change on ClientSession bump version number.
  key = 'gfSession_1'

  get = (): ?ClientSession => store.get(this.key)

  remove = (): void => store.remove(this.key)

  set = (session: ClientSession) => store.set(this.key, session)
}

const sessionStore = new SessionStore();

export {
  sessionStore,
};
