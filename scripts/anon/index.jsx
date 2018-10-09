// @flow

import * as React from 'react';

import '../../styles/anon.scss';
// import { AppContext } from '../core/context';
import { SessionRedirector } from '../core/sessionredirector';


type AnonPageProps = any

class AnonPage extends React.Component<AnonPageProps> {
  mock() {
    return this;
  }

  render() {
    return (
      <SessionRedirector>
        <div>
          Anon Page
        </div>
      </SessionRedirector>
    );
  }
}


export { AnonPage };
