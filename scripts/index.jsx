// @flow
import 'babel-polyfill';
import '../styles/home.scss';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as M from 'materialize-css';

import { Base } from './core/base';
import { lazy } from './core/lazy';
import { LoginPage } from './login';
// import { HomePage } from './home';
import './core/materialize';
// import { AppProvider } from './core/context';

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
          path="/"
          component={lazy(import('./home').then(({ HomePage }) => (HomePage)))}
        />
        <Route exact path="/login" component={LoginPage} />
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
const instances = M.Sidenav.init(elems, options);
console.log(instances);
hot(module)(App); // eslint-ignore-line import /no-default-export
