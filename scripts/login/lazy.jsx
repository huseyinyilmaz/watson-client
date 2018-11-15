// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyLoginPage: any = Loadable(
  {
    loader: () => (import('./index').then(({ LoginPage }) => (LoginPage))),
    loading: Loading,
  },
);

export { LazyLoginPage };
