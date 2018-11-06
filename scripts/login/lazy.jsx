// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyLoginPage = Loadable(
  {
    loader: () => (import('./index').then(({ LoginPage }) => (LoginPage))),
    loading: Loading,
  },
);

export { LazyLoginPage };
