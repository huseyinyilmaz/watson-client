// @flow

import { AccountsAPI } from './accounts';

export type Apis =
  {|
   accounts: AccountsAPI,
   |};

const apis = {
  accounts: new AccountsAPI(),
};

export { apis };
