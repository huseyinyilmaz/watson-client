// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyAnonPage = Loadable(
  {
    loader: () => (import('./index').then(({ AnonPage }) => (AnonPage))),
    loading: Loading,
  },
);

export { LazyAnonPage };
