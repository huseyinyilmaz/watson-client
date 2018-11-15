// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyDiffPage: any = Loadable(
  {
    loader: () => (import('./index').then(({ DiffPage }) => (DiffPage))),
    loading: Loading,
  },
);

export { LazyDiffPage };
