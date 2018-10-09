// @flow

import * as React from 'react';

import '../../styles/anon.scss';
import { Redirect } from 'react-router';

import { AppContext } from './context';

type SessionRedirectorProps = {
  children: React.Element<any>,
};

class SessionRedirector extends React.Component<SessionRedirectorProps> {
  state = undefined

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            if (session) {
              const { organization, project } = session;
              const fullUrl = `/${organization.slug}/${project.slug}/`;
              return (<Redirect to={fullUrl} />);
            } else {
              const { children } = this.props;
              return (
                <React.Fragment>
                  {children}
                </React.Fragment>);
            }
          }
        }
      </AppContext.Consumer>);
  }
}


export { SessionRedirector };
