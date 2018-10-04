// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { apis } from './api';

import type { AppStatus } from './context';

type HeaderProps = {
  user: any,
  status: AppStatus,
  removeToken: () => void,
};

class Header extends React.Component<HeaderProps> {
  logoutHandler = () => {
    const { removeToken } = this.props;
    apis.accounts.sessionDelete().then(removeToken);
  }

  render() {
    const { status, user } = this.props;
    let session;
    let organizationButton;
    let screenshotButton;
    let projectButton;

    if (status === 'initializing') {
      session = (
        <div>
          Initializing...
        </div>);
    } else if (status === 'initialized') {
      if (user) {
        session = (
          <button
            type="button"
            className="waves-effect waves-light btn"
            onClick={this.logoutHandler}
          >
            Logout
          </button>);
        organizationButton = (
          <Link to="/organizations">
            Organizations
          </Link>);
        screenshotButton = (
          <Link to="/screenshots">
            Screenshots
          </Link>);
        projectButton = (
          <Link to="/projects">
            Projects
          </Link>);
      } else {
        session = (
          <Link
            to="/login"
            className="waves-effect waves-light btn"
          >
            Login
          </Link>
        );
      }
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Watson
            </Link>
            <a href="#!" data-target="mobile-menu" className="sidenav-trigger">
              <i className="fa fa-bars fa-2x" aria-hidden="true" />
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                { projectButton }
              </li>

              <li>
                { screenshotButton }
              </li>

              <li>
                { organizationButton }
              </li>
              <li>
                { session }
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-menu">
          <li>
            { session }
          </li>
          <li>
            { screenshotButton }
          </li>
          <li>
            { organizationButton }
          </li>
        </ul>
      </div>);
  }
}

export { Header };
