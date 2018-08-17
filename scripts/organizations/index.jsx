// @flow

import * as React from 'react';

import '../../styles/organizations.scss';

import { AppContext } from '../core/context';


type OrganizationsPageProps = any

class OrganizationsPage extends React.Component<OrganizationsPageProps> {
  mock() {
    return this;
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const empty = '#';

            const orgs = context.state.organizations.map(
              o => (
                <div className="card small" key={o.id}>
                  <div className="card-content">
                    <span className="card-title">
                      {o.name}
                    </span>
                    <p>
                      I am a very simple card.
                      I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.
                    </p>
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
            console.log('context', context);
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
      </AppContext.Consumer>);
  }
}

export { OrganizationsPage };
