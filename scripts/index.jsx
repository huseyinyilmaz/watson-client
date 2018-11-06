// @flow strict
import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import * as M from 'materialize-css';
import { Base } from './core/base';
import { history } from './core/history';
// import { LoginPage } from './login';
// import { HomePage } from './home';
import './core/materialize';
// import { AppProvider } from './core/context';
import { LazyHomePage } from './home/lazy';
import { LazyLoginPage } from './login/lazy';
import { LazySignupPage } from './signup/lazy';
import { LazyDiffPage } from './diff/lazy';
import { LazyOrganizationsPage } from './organizations/lazy';
import { LazyAnonPage } from './anon/lazy';
import {
  LazyProjectsPage,
  LazyNewProjectPage,
} from './projects/lazy';
import {
  LazyScreenshotsPage,
  LazyNewScreenshotPage,
  LazyScreenshotDetailPage,
} from './screenshots/lazy';

const getRoot = () => {
  let root = document.getElementById('watson_root');
  if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', 'watson_root');
    if (root && document.body) {
      document.body.appendChild(root);
    } else {
      console.log('Could not find body element or root element');
    }
  }
  return root;
};

const App = (
  <Router history={history}>
    <Base>
      <Switch>
        <Route
          exact
          path="/o/:organization_slug/p/:project_slug/"
          component={LazyHomePage}
        />

        <Route exact path="/organizations" component={LazyOrganizationsPage} />
        <Route exact path="/o/:organization_slug/projects" component={LazyProjectsPage} />

        <Route exact path="/:organization_slug/:project_slug/screenshots" component={LazyScreenshotsPage} />
        <Route exact path="/:organization_slug/:project_slug/screenshots/new" component={LazyNewScreenshotPage} />
        <Route exact path="/:organization_slug/:project_slug/screenshots/detail/:id" component={LazyScreenshotDetailPage} />

        <Route exact path="/o/:organization_slug/projects/new" component={LazyNewProjectPage} />

        <Route exact path="/login" component={LazyLoginPage} />
        <Route exact path="/signup" component={LazySignupPage} />
        <Route exact path="/diff" component={LazyDiffPage} />

        <Route
          exact
          path="/"
          component={LazyAnonPage}
        />
      </Switch>
    </Base>
  </Router>
);

ReactDOM.render(
  App,
  getRoot(),
);

// <Route path="/cars" component={Car}/>
// <Route path="/about" component={About}/>

const options = {};
const elems = document.querySelectorAll('.sidenav');
M.Sidenav.init(elems, options);
hot(module)(App); // eslint-ignore-line import /no-default-export
