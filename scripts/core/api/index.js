// @flow strict

import { AccountsAPI } from './accounts';
import { CoreAPI } from './core';
import { ScreenshotsAPI } from './screenshots';

export type Apis =
  {|
   accounts: AccountsAPI,
   core: CoreAPI,
   |};

const apis = {
  accounts: new AccountsAPI(),
  core: new CoreAPI(),
  screenshots: new ScreenshotsAPI(),
};

export { apis };
