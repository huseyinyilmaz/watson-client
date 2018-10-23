// @flow
import '@babel/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as M from 'materialize-css';
import { Base } from './core/base';
// import { LoginPage } from './login';
// import { HomePage } from './home';
import './core/materialize';
// import { AppProvider } from './core/context';
import { LazyHomePage } from './home/lazy';
import { LazyLoginPage } from './login/lazy';
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
  <BrowserRouter>
    <Base>
      <Switch>
        <Route
          exact
          path="/:organization_slug/:project_slug/"
          component={LazyHomePage}
        />

        <Route exact path="/organizations" component={LazyOrganizationsPage} />
        <Route exact path="/o/:organization_slug/projects" component={LazyProjectsPage} />

        <Route exact path="/:organization_slug/:project_slug/screenshots" component={LazyScreenshotsPage} />
        <Route exact path="/:organization_slug/:project_slug/screenshots/new" component={LazyNewScreenshotPage} />
        <Route exact path="/:organization_slug/:project_slug/screenshots/detail/:id" component={LazyScreenshotDetailPage} />

        <Route exact path="/:organization_slug/:project_slug/projects/new" component={LazyNewProjectPage} />

        <Route exact path="/login" component={LazyLoginPage} />
        <Route exact path="/diff" component={LazyDiffPage} />

        <Route
          exact
          path="/"
          component={LazyAnonPage}
        />
      </Switch>
    </Base>
  </BrowserRouter>
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
