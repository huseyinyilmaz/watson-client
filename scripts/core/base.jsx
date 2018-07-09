// @flow
import * as React from 'react';
import { Header } from './header';
import { LoginDialog } from '../dialogs/login';
import { AppContext } from './context';

const Base = () => (
  <AppContext.Consumer>
    {
      context => {
        return (
          <React.Fragment>
            <Header user={context.state.user} />
            <LoginDialog />
          </React.Fragment>
        );
      }
    }
  </AppContext.Consumer>);


export { Base };
