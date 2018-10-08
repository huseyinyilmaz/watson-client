// @flow
import * as React from 'react';
import { Header } from './header';
import { AppContext, AppProvider } from './context';

type BaseProps = {
  children: React.Element<any>,
};

const Base = (props: BaseProps) => (
  <AppProvider>
    <AppContext.Consumer>
      {
        context => (
          <React.Fragment>
            <Header
              user={context.state.session && context.state.session.user}
              status={context.state.status}
              removeToken={context.actions.removeToken}
            />
            { props.children }
          </React.Fragment>
        )
      }
    </AppContext.Consumer>
  </AppProvider>);

export { Base };
