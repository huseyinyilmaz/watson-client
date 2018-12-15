// @flow strict
import * as React from 'react';
import type { Organization } from '../core/types';
import { apis } from '../core/api';
import { DeleteOrganizationModal } from './organizationcarddeletemodal';

const empty = '#';

type OrganizationCardProps =
  {|
   isSelected: boolean,
   organization: Organization,
   updateSessionByOrganization: (number) => void,
   updateOrganizationList: () => void,
|};

type OrganizationCardState =
  {|
   deleteModalOpen: boolean,
   |};

const defaultOrganizationCardState: OrganizationCardState = {
  deleteModalOpen: false,
};


class OrganizationCard extends React.Component<OrganizationCardProps, OrganizationCardState> {
  state = defaultOrganizationCardState

  selectHandler = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const { updateSessionByOrganization, organization } = this.props;
    updateSessionByOrganization(organization.id);
  }

  deleteHandler = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ deleteModalOpen: true });
  }

  deleteOrganization = () => {
    // XXX do not delete default or selected organization.
    const { updateOrganizationList, organization } = this.props;
    apis.accounts.organizationDelete(organization.id)
      .then(updateOrganizationList)
      .catch((ex) => { console.log('ex', ex); debugger; });
  }

  cancelDelete = () => {
    this.setState({ deleteModalOpen: false });
  }

  render() {
    const { isSelected, organization } = this.props;
    const { deleteModalOpen } = this.state;
    let selectedCss;
    if (isSelected) {
      selectedCss = 'card small organization-card selected';
    } else {
      selectedCss = 'card small organization-card';
    }

    return (
      <div className="col s12 m6 l4" key={organization.id}>
        <div className={selectedCss}>
          <div className="card-content">
            <span className="card-title">
              { organization.name }
            </span>
            <table className="striped responsive-table organization-table">
              <tbody>
                <tr>
                  <th>id</th>
                  <td>{ organization.id }</td>
                </tr>
                <tr>
                  <th>company</th>
                  <td>{ organization.company }</td>
                </tr>
                <tr>
                  <th>location</th>
                  <td>{ organization.location }</td>
                </tr>
                <tr>
                  <th>email</th>
                  <td>{ organization.email }</td>
                </tr>
                <tr>
                  <th>url</th>
                  <td>{ organization.url }</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-action">
            <a href={empty} onClick={this.selectHandler}>
              Select
            </a>
            <a href={empty} onClick={this.deleteHandler}>
              Delete
            </a>
            { deleteModalOpen
           && (
             <DeleteOrganizationModal
               organization={organization}
               onDeleteHandler={this.deleteOrganization}
               onCancelHandler={this.cancelDelete}
             />)}
          </div>
        </div>
      </div>);
  }
}

export { OrganizationCard };
