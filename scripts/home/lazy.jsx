// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyHomePage: any = Loadable(
  {
    loader: () => (import('./index').then(({ HomePage }) => (HomePage))),
    loading: Loading,
  },
);

export { LazyHomePage };
