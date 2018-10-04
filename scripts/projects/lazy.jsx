// import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyProjectsPage = Loadable(
  {
    loader: () => (import('./index').then(({ ProjectsPage }) => (ProjectsPage))),
    loading: Loading,
  },
);

const LazyNewProjectPage = Loadable(
  {
    loader: () => (import('./new').then(({ NewProjectPage }) => (NewProjectPage))),
    loading: Loading,
  },
);

// const LazyProjectDetailPage = Loadable(
//   {
//     loader: () => (import('./detail').then(({ ProjectDetailPage }) => (ProjectDetailPage))),
//     loading: Loading,
//   },
// );

export { LazyProjectsPage, LazyNewProjectPage };
