// @flow

import * as React from 'react';
import { Redirect } from 'react-router';

import '../../styles/projects-new.scss';
import { apis } from '../core/api';

import { AppContext } from '../core/context';

declare var M: any;

type NewProjectPageProps = { organization: number };

type NewProjectPageState =
  {|
   name: string,
   nameError: string,
   generalError: string,

   project: any,

   |}

const defaultNewProjectState: NewProjectPageState = {
  name: '',

  nameError: '',
  generalError: '',
  project: undefined,
};

class NewProjectPageInternal
  extends React.Component<NewProjectPageProps, NewProjectPageState> {
  state = defaultNewProjectState

  componentDidMount() {
    console.log('Call component did mount');
    M.updateTextFields();
  }

  handleNameOnChange = (e: any) => {
    this.setState({ name: e.target.value });
  }

  handleOnSubmit = () => {
    const { name } = this.state;
    const { organization } = this.props;

    apis.accounts.projectCreate(
      name,
      organization,
    ).then((data) => {
      this.setState({ project: data });
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
    const { project } = this.state;
    if (project) {
      const fullUrl = `/projects/detail/${project.id}`;
      return (<Redirect to={fullUrl} />);
    }
    return (
      <AppContext.Consumer>
        {
          (context) => {
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
              <div className="container new-project-container">
                <div className="section">
                  <div className="row">
                    <div className="col s12 m6 l4">
                      Create a new project.
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
                        Create a Project
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

const NewProjectPage = () => (
  <AppContext.Consumer>
    {
      (context) => {
        const { state: { session } } = context;
        let currentOrganization;
        if (session) {
          const { organization } = session;
          currentOrganization = organization.id;
        } else {
          currentOrganization = -1;
        }
        return (<NewProjectPageInternal organization={currentOrganization} />);
      }
    }
  </AppContext.Consumer>);

export { NewProjectPage };
