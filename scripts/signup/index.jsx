// @flow strict

import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { apis } from '../core/api';
import { AppContext } from '../core/context';
import { TextField } from '../core/components/textfield';
import { Result } from './result';

import '../../styles/login.scss';

import type { SignupUser } from '../core/types';

type SignupPageState = {|
  user: ?SignupUser,
  generalError: ?string,
|}

type SignupPageProps = {||}

const defaultState: SignupPageState = {
  user: undefined,
  generalError: undefined,
};

const initialValues = {
  name: '',
  email: '',
  password: '',
  password2: '',
  organizationCompany: '',
  organizationLocation: '',
  organizationCompanyUrl: '',
};


class SignupPageInternal extends React.Component<SignupPageProps, SignupPageState> {
  state = defaultState

  schema = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().email().required('Required'),
    password: yup.string().required('Required'),
    password2: yup.string().oneOf(
      [yup.ref('password'), null],
      'Passwords does not match.',
    ).required('Required'),
    organizationCompany: yup.string(),
    organizationLocation: yup.string(),
    organizationCompanyUrl: yup.string().url(),
  });


  onSubmitHandler = (values, state) => {
    this.setState({ generalError: undefined });
    const {
      setSubmitting,
      setErrors,
    } = state;
    console.log('onSubmitHandler state', state);
    const {
      name, email, password, organizationCompany, organizationLocation, organizationCompanyUrl,
    } = values;
    const data = {
      user: { full_name: name, email, password },
      organization: {
        company: organizationCompany,
        location: organizationLocation,
        company_url: organizationCompanyUrl,
      },
    };
    apis.accounts.signup(data)
      .then((d) => {
        if (d.status === 201) {
          this.setState({ user: data.user });
        } else {
          this.setState({ generalError: 'There was an error with your request. Please try again in a few seconds.' });
          console.log(d);
        }
      })
      .catch((e) => {
        if (e && e.response && e.response.status === 400) {
          // make sure status code matches
          const {
            user: userErrors,
            organization: organizationErrors,
          } = e.response.data;
          const errors = {};

          if (userErrors) {
            const {
              full_name: nameErrors,
              email: emailErrors,
              password: passwordErrors,
            } = userErrors;

            if (nameErrors && nameErrors.length > 0) {
              const [error] = nameErrors;
              errors.name = error;
            }

            if (emailErrors && emailErrors.length > 0) {
              const [error] = emailErrors;
              errors.email = error;
            }

            if (passwordErrors && passwordErrors.length > 0) {
              const [error] = passwordErrors;
              errors.password = error;
            }
          }

          if (organizationErrors) {
            const {
              company: organizationCompanyErrors,
              location: organizationLocationErrors,
              company_url: organizationCompanyUrlErrors,
            } = organizationErrors;

            if (organizationCompanyErrors && organizationCompanyErrors.length > 0) {
              const [error] = organizationCompanyErrors;
              errors.organizationCompany = error;
            }

            if (organizationLocationErrors && organizationLocationErrors.length > 0) {
              const [error] = organizationLocationErrors;
              errors.organizationLocation = error;
            }

            if (organizationCompanyUrlErrors && organizationCompanyUrlErrors.length > 0) {
              const [error] = organizationCompanyUrlErrors;
              errors.organizationCompanyUrl = error;
            }
          }
          setErrors(errors);
        } else {
          this.setState({ generalError: 'There was an error with your request. Please try again in a few seconds.' });
        }
      }).finally(() => setSubmitting(false));

    // console.log('Signin up:', name, email, password, company, location, companyUrl);
  }

  render() {
    const {
      user,
      generalError,
    } = this.state;
    // If we have a user that means we are already logged in
    // redirect to home page.
    if (user) {
      return (<Result user={user} />);
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
                          Signup Form
                        </div>
                        <form>
                          <TextField
                            id="name"
                            type="text"
                            display="Full Name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.name}
                            touched={touched.name}
                          />
                          <TextField
                            id="email"
                            type="text"
                            display="Email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.email}
                            touched={touched.email}
                          />
                          <TextField
                            id="password"
                            type="password"
                            display="Password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.password}
                            touched={touched.password}
                          />
                          <TextField
                            id="password2"
                            type="password"
                            display="Repeat Password"
                            value={values.password2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.password2}
                            touched={touched.password2}
                          />
                          <TextField
                            id="organizationCompany"
                            type="text"
                            display="Company"
                            value={values.organizationCompany}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.organizationCompany}
                            touched={touched.organizationCompany}
                          />
                          <TextField
                            id="organizationLocation"
                            type="text"
                            display="Location"
                            value={values.organizationLocation}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.organizationLocation}
                            touched={touched.organizationLocation}
                          />
                          <TextField
                            id="organizationCompanyUrl"
                            type="text"
                            display="Company Url"
                            value={values.organizationCompanyUrl}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.organizationCompanyUrl}
                            touched={touched.organizationCompanyUrl}
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
                          Signup
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

const SignupPage = () => (
  <AppContext.Consumer>
    {
      (context) => {
        console.log(context);
        // const { actions: { setToken }, state: { session } } = context;
        return (<SignupPageInternal />);
      }
    }
  </AppContext.Consumer>);

export { SignupPage };
