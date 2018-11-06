// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazySignupPage = Loadable(
  {
    loader: () => (import('./index').then(({ SignupPage }) => (SignupPage))),
    loading: Loading,
  },
);

export { LazySignupPage };
