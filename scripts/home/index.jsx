// @flow
import * as React from 'react';
// import { Modal } from 'materialize-css/dist/js/materialize';
// import { sessionCreate } from '../core/api/accounts';
import { Link } from 'react-router-dom';

type HomePageProps = any

class HomePage extends React.Component<HomePageProps> {
  mock() {
    return this;
  }

  render() {
    return (
      <div>
        Home Page
        <Link to={{ pathname: '/login' }}>
        Login
        </Link>
      </div>);
  }
}


export { HomePage };
