// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyDiffPage = Loadable(
  {
    loader: () => (import('./index').then(({ DiffPage }) => (DiffPage))),
    loading: Loading,
  },
);

export { LazyDiffPage };
