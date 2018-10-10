// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { buildPath } from '../urlutils';

type HeaderProps = {};

class OrganizationButton extends React.Component<HeaderProps> {
  state = undefined

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            if (session) {
              const fullPath = buildPath(session, '/organizations');
              const { organization } = session;
              return (
                <span className="organization-button btn">
                  Organization:
                  <Link to={fullPath}>
                    { organization.name }
                  </Link>
                </span>);
            } else {
              return null;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { OrganizationButton };
