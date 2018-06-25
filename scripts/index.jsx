import 'babel-polyfill';
import '../styles/home.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
// import {Router, Route} from 'react-router';

const getRoot = () => {
  let root = document.getElementById('watson_root');
  if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', 'watson_root');
    document.body.appendChild(root);
  }
  return root;
};


const App = (
  <div>
    Hello World!
  </div>
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


hot(module)(App); // eslint-ignore-line import /no-default-export

console.log('test');
