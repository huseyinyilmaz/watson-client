// @flow
import * as React from 'react';

import Loadable from 'react-loadable';


const Loading = () => (
  <div>
    Loading
  </div>);

const lazy = (componentPromise: any) => {
  const loadable = Loadable({
    loader: () => componentPromise,
    loading: Loading,
  });
  return loadable;
};

export { lazy };
