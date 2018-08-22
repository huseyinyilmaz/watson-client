// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyScreenshotsPage = Loadable(
  {
    loader: () => (import('./index').then(({ ScreenshotsPage }) => (ScreenshotsPage))),
    loading: Loading,
  },
);

export { LazyScreenshotsPage };
