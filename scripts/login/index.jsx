// @flow strict

import * as React from 'react';
import { Redirect } from 'react-router';

import { apis } from '../core/api';
import { AppContext } from '../core/context';

import '../../styles/login.scss';

type LoginPageState = {
  username: string,
  password: string,
  usernameError: ?string,
  passwordError: ?string,
  generalError: ?string,
  disabled: boolean,
}

type LoginPageProps = {
  user: any,
  setToken: (string) => void,
}

const defaultState = {
  username: '',
  password: '',
  usernameError: undefined,
  passwordError: undefined,
  generalError: undefined,
  disabled: false,
};

class LoginPageInternal extends React.Component<LoginPageProps, LoginPageState> {
  state = defaultState;

  usernameOnChangeHandler = (e: any) => {
    const username = e.target.value;
    this.setState({ username });
  }

  passwordOnChangeHandler = (e: any) => {
    const password = e.target.value;
    this.setState({ password });
  }

  loginHandler = () => {
    this.setState({ disabled: true });
    const { username, password } = this.state;
    const { setToken } = this.props;
    const resp = apis.accounts.sessionCreate(username, password);
    resp.then(({ token }) => {
      setToken(token);
    }).catch((e) => {
      if (e.response && e.response.status) {
        switch (e.response.status) {
          case 400:
            if (e.response.data.email) {
              this.setState({ usernameError: e.response.data.email });
            }
            if (e.response.data.password) {
              this.setState({ passwordError: e.response.data.password });
            }
            if (e.response.data.non_field_errors) {
              this.setState({ generalError: e.response.data.non_field_errors });
            }
            break;
          default:
            this.setState({ generalError: 'There were a problem with the server response. Please try again in a few seconds.' });
            break;
        }
      // { response: { data } })
      } else {
        this.setState({ generalError: 'There is a problem with internet connection. Please try again in a few seconds.' });
      }
    }).finally(() => this.setState({ disabled: false }));
  }

  removeErrors = () => {
    this.setState({
      usernameError: undefined,
      passwordError: undefined,
      generalError: undefined,
    });
  }

  render() {
    // If we have a user that means we are already logged in
    // redirect to home page.
    const { user } = this.props;
    if (user) {
      return (<Redirect to="/" />);
    }

    const {
      username,
      password,
      usernameError,
      passwordError,
      generalError,
      disabled,
    } = this.state;

    // ========================= login button ========================

    let loginButton;
    if (disabled) {
      loginButton = (
        <button
          type="button"
          className="btn disabled"
        >
          Login
        </button>);
    } else {
      loginButton = (
        <button
          type="button"
          className="btn waves-effect waves-green"
          onClick={this.loginHandler}
        >
          Login
        </button>);
    }

    // ====================== set username error =====================
    let usernameErrorMessage = null;
    let usernameClass = 'validate';
    if (usernameError) {
      usernameErrorMessage = (
        <span className="helper-text" data-error={usernameError} data-success="right" />
      );
      usernameClass = 'validate invalid';
    }
    // ====================== set password error =====================
    let passwordErrorMessage = null;
    let passwordClass = 'validate';
    if (passwordError) {
      passwordErrorMessage = (
        <span className="helper-text" data-error={passwordError} data-success="right" />
      );
      passwordClass = 'validate invalid';
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
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col offset-s3 s6">
              <div className="card">
                <div className="card-content">
                  <div className="card-title">
                    Login Form
                  </div>

                  <form>
                    <div className="input-field">
                      <input
                        id="email"
                        type="email"
                        className={usernameClass}
                        value={username}
                        onFocus={this.removeErrors}
                        onChange={this.usernameOnChangeHandler}
                      />
                      <label htmlFor="email">
                        Email
                      </label>
                      { usernameErrorMessage }
                    </div>
                    <div className="input-field">
                      <input
                        id="password"
                        type="password"
                        className={passwordClass}
                        value={password}
                        onFocus={this.removeErrors}
                        onChange={this.passwordOnChangeHandler}
                      />
                      <label htmlFor="password">
                        Password
                      </label>
                      { passwordErrorMessage }
                    </div>
                  </form>
                  {generalErrorMessage}
                </div>
                <div className="card-action">
                  { loginButton }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

const LoginPage = () => (
  <AppContext.Consumer>
    {
      (context) => {
        const { actions: { setToken }, state: { session } } = context;
        return (<LoginPageInternal user={session && session.user} setToken={setToken} />);
      }
    }
  </AppContext.Consumer>);

export { LoginPage };
