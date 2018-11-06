// @flow strict

import * as React from 'react';
import { Redirect } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import { apis } from '../core/api';
import { AppContext } from '../core/context';
import { InputField } from './inputfield';

import '../../styles/login.scss';

type SignupPageState = {|
  user: any,
  generalError: ?string,
|}

type SignupPageProps = {||}

const defaultState = {
  user: undefined,
  generalError: undefined,
};

class SignupPageInternal extends React.Component<SignupPageProps, SignupPageState> {
  state = defaultState;

  initialValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
    organizationCompany: '',
    organizationLocation: '',
    organizationCompanyUrl: '',
  }

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
    const {
      setSubmitting,
      setErrors,
    } = state;
    console.log('onSubmitHandler state', state);
    const {
      name, email, password, organizationCompany, organizationLocation, organizationCompanyUrl,
    } = values;
    const data = {
      name,
      email,
      password,
      organization_company: organizationCompany,
      organization_location: organizationLocation,
      organization_company_url: organizationCompanyUrl,
    };
    apis.accounts.signup(data).catch((e) => {
      // make sure status code matches
      const {
        name: nameErrors,
        email: emailErrors,
        password: passwordErrors,
        organization_company: organizationCompanyErrors,
        organization_location: organizationLocationErrors,
        organization_company_url: organizationCompanyUrlErrors,
      } = e.response.data;
      const errors = {};

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

      setErrors(errors);

      console.log(e);
    }).finally(() => setSubmitting(false));

    // console.log('Signin up:', name, email, password, company, location, companyUrl);
  }

  removeErrors = () => {
    this.setState({ generalError: undefined });
  }

  render() {
    const {
      user,
      generalError,
    } = this.state;

    // If we have a user that means we are already logged in
    // redirect to home page.
    if (user) {
      return (<Redirect to="/" />);
    }

    return (
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col offset-s3 s6">
              <Formik
                initialValues={this.initialValues}
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
                          <InputField
                            id="name"
                            type="text"
                            display="Full Name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.name}
                            touched={touched.name}
                          />
                          <InputField
                            id="email"
                            type="text"
                            display="Email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.email}
                            touched={touched.email}
                          />
                          <InputField
                            id="password"
                            type="password"
                            display="Password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.password}
                            touched={touched.password}
                          />
                          <InputField
                            id="password2"
                            type="password"
                            display="Repeat Password"
                            value={values.password2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.password2}
                            touched={touched.password2}
                          />
                          <InputField
                            id="organizationCompany"
                            type="text"
                            display="Company"
                            value={values.organizationCompany}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.organizationCompany}
                            touched={touched.organizationCompany}
                          />
                          <InputField
                            id="organizationLocation"
                            type="text"
                            display="Location"
                            value={values.organizationLocation}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.organizationLocation}
                            touched={touched.organizationLocation}
                          />
                          <InputField
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
