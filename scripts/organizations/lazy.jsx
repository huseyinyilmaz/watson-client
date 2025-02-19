// @flow strict
// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyOrganizationsPage: any = Loadable(
  {
    loader: () => (import('./index').then(({ OrganizationsPage }) => (OrganizationsPage))),
    loading: Loading,
  },
);

const LazyNewOrganizationPage: any = Loadable(
  {
    loader: () => (import('./new').then(({ NewOrganizationPage }) => (NewOrganizationPage))),
    loading: Loading,
  },
);

export { LazyOrganizationsPage, LazyNewOrganizationPage };
