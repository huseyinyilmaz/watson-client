// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { apis } from '../api';
import type { AppStatus } from '../context';

import { OrganizationButton } from './organization';
import { ProjectButton } from './project';
import { DashboardButton } from './dashboard';

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
    let dashboardButton;

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
        dashboardButton = (
          <DashboardButton />);
        organizationButton = (
          <OrganizationButton />);
        projectButton = (
          <ProjectButton />);
        screenshotButton = (
          <Link to="/screenshots">
            Screenshots
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
      <div className="header-container">
        <ul id="project_dropdown" className="dropdown-content">
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li className="divider" />
          <li><a href="#!">three</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="header-logo">
              Watson
            </Link>
            <span className="hide-on-med-and-down">
              { dashboardButton }
              { projectButton }
              { organizationButton }
            </span>

            <a href="#!" data-target="mobile-menu" className="sidenav-trigger">
              <i className="fa fa-bars fa-2x" aria-hidden="true" />
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                { screenshotButton }
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
            { organizationButton }
          </li>
          <li>
            { projectButton }
          </li>
          <li>
            { screenshotButton }
          </li>

        </ul>
      </div>);
  }
}

export { Header };
