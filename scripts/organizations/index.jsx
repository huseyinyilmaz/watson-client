// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../core/context';

import '../../styles/organizations.scss';

import type { Organization } from '../core/types';

import { apis } from '../core/api';
import { PreLoader } from '../core/loading';
import { getNewOrganizationPath } from '../core/urlutils';

import { OrganizationCard } from './organizationcard';

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
    this.updateOrganizationList();
  }

  updateOrganizationList =() => {
    this.setState({ organizations: undefined });
    apis.accounts.organizationsGet().then((data) => {
      this.setState({ organizations: data });
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            const { updateSessionByOrganization } = context.actions;

            const { organizations } = this.state;

            if (!session || !organizations) {
              return (<PreLoader />);
            } else {
              const { organization } = session;
              const fullPath = getNewOrganizationPath();
              const organizationDivs = organizations.map((o) => {
                const isSelected = (organization.id === o.id);
                return (
                  <OrganizationCard
                    updateSessionByOrganization={updateSessionByOrganization}
                    updateOrganizationList={this.updateOrganizationList}
                    isSelected={isSelected}
                    organization={o}
                    key={o.id}
                  />);
              });

              return (
                <div className="container organizations-container">
                  <div className="section">
                    <div className="row">
                      <div className="col s12">
                        <Link to={fullPath}>
                          Create a new organization
                        </Link>
                      </div>
                    </div>

                    <div className="row">
                      { organizationDivs }
                    </div>
                  </div>
                </div>);
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { OrganizationsPage };
