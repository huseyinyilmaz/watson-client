// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

type DashboardButtonProps = {};

class DashboardButton extends React.Component<DashboardButtonProps> {
  state = undefined

  render() {
    return (
      <Link to="/dashboard" className="dashboard-button btn">
        Dashboard
      </Link>
    );
  }
}

export { DashboardButton };
