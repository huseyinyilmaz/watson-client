// @flow

import * as React from 'react';
import { Redirect } from 'react-router';

import '../../styles/organizations-new.scss';
import { apis } from '../core/api';
import { getOrganizationsPath } from '../core/urlutils';

import { AppContext } from '../core/context';

declare var M: any;

type NewOrganizationPageProps = {};

type NewOrganizationPageState =
  {|
   name: string,
   company: string,
   location: string,
   email: string,
   url: string,
   nameError: string,
   companyError: string,
   locationError: string,
   emailError: string,
   urlError: string,
   generalError: string,
   organization: any,
   |}

const defaultNewOrganizationState: NewOrganizationPageState = {
  name: '',
  company: '',
  location: '',
  email: '',
  url: '',
  nameError: '',
  companyError: '',
  locationError: '',
  emailError: '',
  urlError: '',
  generalError: '',
  organization: undefined,
};

class NewOrganizationPage
  extends React.Component<NewOrganizationPageProps, NewOrganizationPageState> {
  state = defaultNewOrganizationState

  componentDidMount() {
    console.log('Call component did mount');
    M.updateTextFields();
  }

  handleNameOnChange = (e: any) => {
    this.setState({ name: e.target.value });
  }

  handleOnSubmit = () => {
    const {
      name,
      company,
      location,
      email,
      url,
    } = this.state;

    apis.accounts.organizationCreate(
      name,
      company,
      location,
      email,
      url,
    ).then((data) => {
      this.setState({ organization: data });
    })
      .catch((e) => {
        window.thisError = e;
        if (e.response && e.response.status) {
          switch (e.response.status) {
            case 400:
              if (e.response.data.name) {
                this.setState({ nameError: e.response.data.name });
              }
              if (e.response.data.non_field_errors) {
                this.setState({ generalError: e.response.data.non_field_errors });
              }
              break;
            default:
              this.setState({ generalError: 'There were a problem with the server response. Please try again in a few seconds.' });
              break;
          }
        }
      });
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { organization } = this.state;
            const { session } = context.state;
            if (session && organization) {
              const fullUrl = getOrganizationsPath();
              return (<Redirect to={fullUrl} />);
            }

            console.log(context);
            const {
              name,
              nameError,
              generalError,
            } = this.state;

            const isValid = name;
            let submitButtonClass = 'submit-button waves-effect waves-light btn';

            if (!isValid) {
              submitButtonClass += ' disabled';
            }

            // ====================== set name error =====================
            let nameErrorMessage = null;
            let nameClass = 'validate';
            if (nameError) {
              nameErrorMessage = (
                <span className="helper-text" data-error={nameError} data-success="right" />
              );
              nameClass = 'validate invalid';
            }
            // ====================== set general error ======================
            let generalErrorMessage = null;
            if (generalError) {
              generalErrorMessage = (
                <div id="general_error_message">
                  {generalError}
                </div>);
            }


            return (
              <div className="container new-organization-container">
                <div className="section">
                  <div className="row">
                    <div className="col s12">
                      Create a new organization.
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="name_field"
                        type="text"
                        className={nameClass}
                        onChange={this.handleNameOnChange}
                        value={name}
                      />
                      <label htmlFor="name_field">
                        Name
                      </label>
                      { nameErrorMessage }
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        type="button"
                        className={submitButtonClass}
                        onClick={this.handleOnSubmit}
                      >
                        Create a Organization
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                  { generalErrorMessage }
                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

export { NewOrganizationPage };
