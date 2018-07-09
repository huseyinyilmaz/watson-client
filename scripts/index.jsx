// @flow
import 'babel-polyfill';
import '../styles/home.scss';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
// import {Router, Route} from 'react-router';
import * as M from 'materialize-css';

import { Base } from './core/base';
import './core/materialize';
import { AppProvider } from './core/context';

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
  <AppProvider>
    <Base />
  </AppProvider>
);

ReactDOM.render(
  App,
  getRoot(),
);

// ReactDOM.render(
//   <Router>
//     <Route component={Main}>
//       <Route path="/" component={Home}/>
//       <Route path="/cars" component={Car}/>
//       <Route path="/about" component={About}/>
//     </Route>
//   </Router>,
//   getRoot(),
// );

const options = {};
const elems = document.querySelectorAll('.sidenav');
const instances = M.Sidenav.init(elems, options);
console.log(instances);
hot(module)(App); // eslint-ignore-line import /no-default-export

console.log('test');
