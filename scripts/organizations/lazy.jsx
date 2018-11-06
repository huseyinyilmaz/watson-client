// @flow strict
// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyOrganizationsPage = Loadable(
  {
    loader: () => (import('./index').then(({ OrganizationsPage }) => (OrganizationsPage))),
    loading: Loading,
  },
);

export { LazyOrganizationsPage };
