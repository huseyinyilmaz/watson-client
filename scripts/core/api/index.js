// @flow

import { AccountsAPI } from './accounts';
import { CoreAPI } from './core';

export type Apis =
  {|
   accounts: AccountsAPI,
   core: CoreAPI,
   |};

const apis = {
  accounts: new AccountsAPI(),
  core: new CoreAPI(),
};

export { apis };
