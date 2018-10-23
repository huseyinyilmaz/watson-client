// @flow

import * as React from 'react';

import '../../styles/home.scss';

type HomePageProps = any

class HomePage extends React.Component<HomePageProps> {
  mock() {
    return this;
  }

  render() {
    return (
      <div>
        Home Page
      </div>);
  }
}


export { HomePage };
