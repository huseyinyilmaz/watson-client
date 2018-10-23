// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { getOrganizationsPath } from '../urlutils';

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
              const fullPath = getOrganizationsPath();
              const { organization } = session;
              return (
                <Link to={fullPath}>
                  <span className="organization-button btn">
                    Organization:
                    { organization.name }
                  </span>
                </Link>);
            } else {
              return null;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { OrganizationButton };
