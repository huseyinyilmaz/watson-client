// @flow strict
import Loadable from 'react-loadable';

import { Loading } from '../core/loading';

const LazyScreenshotsPage: any = Loadable(
  {
    loader: () => (import('./index').then(({ ScreenshotsPage }) => (ScreenshotsPage))),
    loading: Loading,
  },
);

const LazyNewScreenshotPage: any = Loadable(
  {
    loader: () => (import('./new').then(({ NewScreenshotPage }) => (NewScreenshotPage))),
    loading: Loading,
  },
);

const LazyScreenshotDetailPage: any = Loadable(
  {
    loader: () => (import('./detail').then(({ ScreenshotDetailPage }) => (ScreenshotDetailPage))),
    loading: Loading,
  },
);

export { LazyScreenshotsPage, LazyNewScreenshotPage, LazyScreenshotDetailPage };
