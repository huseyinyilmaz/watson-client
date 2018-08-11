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
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="fa fa-bars fa-2x" aria-hidden="true" />
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                { organizationButton }
              </li>

              <li>
                <a href="sass.html">
                  Sass
                </a>
              </li>
              <li>
                <a href="badges.html">
                  Components
                </a>
              </li>
              <li>
                <a href="collapsible.html">
                  Javascript
                </a>
              </li>
              <li>
                <a href="mobile.html">
                  Mobile
                </a>
              </li>
              <li>
                { session }
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <a className="waves-effect waves-light btn" href="login.html">
              Login
            </a>
          </li>
          <li>
            <a href="sass.html">
              Sass
            </a>
          </li>
          <li>
            <a href="badges.html">
              Components
            </a>
          </li>
          <li>
            <a href="collapsible.html">
              Javascript
            </a>
          </li>
          <li>
            <a href="mobile.html">
              Mobile
            </a>
          </li>
        </ul>
      </div>);
  }
}

export { Header };
