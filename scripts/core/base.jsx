// @flow
import * as React from 'react';
import { Header } from './header';
import { AppContext } from './context';

type BaseProps = {
  children: React.Element<any>,
};

const Base = (props: BaseProps) => (
  <AppContext.Consumer>
    {
      context => (
        <React.Fragment>
          <Header
            user={context.state.user}
            openLoginDialog={context.actions.openLoginDialog}
          />
          { props.children }
        </React.Fragment>
      )
    }
  </AppContext.Consumer>);


export { Base };
