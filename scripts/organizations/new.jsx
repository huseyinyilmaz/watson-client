// @flow

import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Redirect } from 'react-router';

import '../../styles/organizations-new.scss';
import { apis } from '../core/api';
import { getOrganizationsPath } from '../core/urlutils';
import { TextField } from '../core/components/textfield';

import { AppContext } from '../core/context';

declare var M: any;

type NewOrganizationPageProps = {};

type NewOrganizationPageState =
  {|
   generalError: string,
   organization: any,
   |}

const defaultNewOrganizationState: NewOrganizationPageState = {
  generalError: '',
  organization: undefined,
};

const initialValues = {
  name: '',
  company: '',
  location: '',
  email: '',
  url: '',
};

class NewOrganizationPage
  extends React.Component<NewOrganizationPageProps, NewOrganizationPageState> {
  state = defaultNewOrganizationState

  schema = yup.object().shape({
    name: yup.string().required('Required'),
    company: yup.string().required('Required'),
    location: yup.string().required('Required'),
    email: yup.string().email().required('Required'),
    url: yup.string().url().required('Required'),
  });

  componentDidMount() {
    M.updateTextFields();
  }

  onSubmitHandler = (values: *, state: *) => {
    this.setState({ generalError: undefined });
    const {
      setSubmitting,
      setErrors,
    } = state;
    const {
      name,
      company,
      location,
      email,
      url,
    } = values;

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
        if (e && e.response && e.response.status === 400) {
          const {
            name: nameErrors,
            company: companyErrors,
            location: locationErrors,
            email: emailErrors,
            url: urlErrors,
          } = e.response.data;
          const errors = {};

          if (nameErrors && nameErrors.length > 0) {
            const [error] = nameErrors;
            errors.name = error;
          }

          if (companyErrors && companyErrors.length > 0) {
            const [error] = companyErrors;
            errors.company = error;
          }

          if (locationErrors && locationErrors.length > 0) {
            const [error] = locationErrors;
            errors.location = error;
          }

          if (emailErrors && emailErrors.length > 0) {
            const [error] = emailErrors;
            errors.email = error;
          }

          if (urlErrors && urlErrors.length > 0) {
            const [error] = urlErrors;
            errors.url = error;
          }

          if (e.response.data.non_field_errors) {
            this.setState({ generalError: e.response.data.non_field_errors });
          }
          setErrors(errors);
        } else {
          this.setState({ generalError: 'There were a problem with the server response. Please try again in a few seconds.' });
        }
      }).finally(() => setSubmitting(false));
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const {
              organization,
              generalError,
            } = this.state;
            const { session } = context.state;
            if (session && organization) {
              const fullUrl = getOrganizationsPath();
              return (<Redirect to={fullUrl} />);
            }

            return (
              <div className="container">
                <div className="section">
                  <div className="row">
                    <div className="col offset-s3 s6">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={this.schema}
                        onSubmit={this.onSubmitHandler}
                      >
                        {(props) => {
                          const {
                            values,
                            touched,
                            errors,
                            // dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            // handleReset,
                            isValid,
                          } = props;
                          console.log('Formik props', props);
                          return (
                            <div className="card">
                              <div className="card-content">
                                <div className="card-title">
                                  Create Organization
                                </div>
                                <form>
                                  <TextField
                                    id="name"
                                    type="text"
                                    display="Organization Name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.name}
                                    touched={touched.name}
                                  />
                                  <TextField
                                    id="company"
                                    type="text"
                                    display="Company Name"
                                    value={values.company}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.company}
                                    touched={touched.company}
                                  />

                                  <TextField
                                    id="location"
                                    type="text"
                                    display="Company Location"
                                    value={values.location}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.location}
                                    touched={touched.location}
                                  />

                                  <TextField
                                    id="email"
                                    type="text"
                                    display="Company Email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.email}
                                    touched={touched.email}
                                  />

                                  <TextField
                                    id="url"
                                    type="text"
                                    display="Company URL"
                                    value={values.url}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.url}
                                    touched={touched.url}
                                  />
                                </form>
                                {generalError && (<div id="general_error_message">{generalError}</div>)}
                              </div>
                              <div className="card-action">
                                <button
                                  type="button"
                                  className="btn waves-effect waves-green"
                                  disabled={(!isValid) || isSubmitting}
                                  onClick={handleSubmit}
                                >
                                  Create
                                </button>
                              </div>
                            </div>);
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

export { NewOrganizationPage };
