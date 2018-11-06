// @flow strict

import * as React from 'react';

import '../../styles/organizations.scss';

import type { Organization } from '../core/types';

import { apis } from '../core/api';
import { PreLoader } from '../core/loading';

type OrganizationsPageProps = any

type OrganizationPageState = {|
  organizations: ?Array<Organization>,
|}

const defaultState = {
  organizations: undefined,
};

class OrganizationsPage extends React.Component<OrganizationsPageProps, OrganizationPageState> {
  state = defaultState

  componentDidMount = () => {
    apis.accounts.organizationsGet().then((data) => {
      this.setState({ organizations: data });
    });
  }

  render() {
    const { organizations } = this.state;
    const empty = '#';

    if (organizations === undefined || organizations === null) {
      return (<PreLoader />);
    } else {
      const orgs = organizations.map(
        o => (
          <div className="card small organization-card" key={o.id}>
            <div className="card-content">
              <span className="card-title">
                {o.name}
              </span>
              <table className="striped responsive-table organization-table">
                <tbody>
                  <tr>
                    <th>id</th>
                    <td>{ o.id }</td>
                  </tr>
                  <tr>
                    <th>Company</th>
                    <td>{ o.company }</td>
                  </tr>
                  <tr>
                    <th>Location</th>
                    <td>{ o.location }</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{ o.email }</td>
                  </tr>
                  <tr>
                    <th>URL</th>
                    <td>{ o.url }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-action">
              <a href={empty}>
                This is a link
              </a>
              <a href={empty}>
                This is a link
              </a>
            </div>
          </div>
        ),
      );
      return (
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m6 l4">
                { orgs }
              </div>
            </div>
          </div>
        </div>);
    }
  }
}

export { OrganizationsPage };
