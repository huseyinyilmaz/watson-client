// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyHomePage = Loadable(
  {
    loader: () => (import('./index').then(({ HomePage }) => (HomePage))),
    loading: Loading,
  },
);

export { LazyHomePage };
