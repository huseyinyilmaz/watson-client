// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyAnonPage: any = Loadable(
  {
    loader: () => (import('./index').then(({ AnonPage }) => (AnonPage))),
    loading: Loading,
  },
);

export { LazyAnonPage };
