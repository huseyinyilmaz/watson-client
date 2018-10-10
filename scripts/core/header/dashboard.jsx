// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { buildPath } from '../urlutils';

type DashboardButtonProps = {};

class DashboardButton extends React.Component<DashboardButtonProps> {
  state = undefined

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            if (session) {
              const fullPath = buildPath(session, '/');
              return (
                <Link to={fullPath} className="dashboard-button btn">
                  Dashboard
                </Link>
              );
            } else {
              return null;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { DashboardButton };
