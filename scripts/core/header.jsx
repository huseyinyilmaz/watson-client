// @flow
import * as React from 'react';

type HeaderProps = {
  user: any,
};

const Header = ({ user }: HeaderProps) => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo">
          Logo
        </a>
        <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
          <i className="fa fa-bars fa-2x" aria-hidden="true" />
        </a>
        <ul className="right hide-on-med-and-down">
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
            <a className="waves-effect waves-light btn" href="login.html">
              Login
              { user }
            </a>
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

export { Header };
