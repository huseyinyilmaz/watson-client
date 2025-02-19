// @flow strict
import * as React from 'react';

import Loadable from 'react-loadable';

import { Loading } from './loading';


const lazy = (componentPromise: any) => {
  const LazyLoadable: any = Loadable({
    loader: componentPromise,
    loading: Loading,
  });
  return (<LazyLoadable />);
};

export { lazy };
