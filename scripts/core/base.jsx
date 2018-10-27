// @flow
import * as React from 'react';
import { Header } from './header';
import { AppContext, AppProvider } from './context';
import { PreLoader } from './loading';

type BaseProps = {
  children: React.Element<any>,
};

const Base = (props: BaseProps) => (
  <AppProvider>
    <AppContext.Consumer>
      {
        (context) => {
          let { children } = props;
          if (context.state.status !== 'initialized') {
            children = <PreLoader />;
          }
          return (
            <React.Fragment>
              <Header
                user={context.state.session && context.state.session.user}
                status={context.state.status}
                removeToken={context.actions.removeToken}
              />
              { children }
            </React.Fragment>
          );
        }
      }
    </AppContext.Consumer>
  </AppProvider>);

export { Base };
