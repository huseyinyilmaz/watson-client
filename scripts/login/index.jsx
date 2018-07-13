// @flow
import * as React from 'react';
// import { Modal } from 'materialize-css/dist/js/materialize';
import { sessionCreate } from '../core/api/accounts';

type LoginPageState = {
  username: string,
  password: string,
}

const defaultState = {
  username: '',
  password: '',
};

type LoginPageProps = any


class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
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
    const { username, password } = this.state;
    const resp = sessionCreate(username, password);
    resp.then(console.log);
  }

  modal: any

  ref: any

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  value={username}
                  onChange={this.usernameOnChangeHandler}
                />
                <label htmlFor="email">
                  Email
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  value={password}
                  onChange={this.passwordOnChangeHandler}
                />
                <label htmlFor="password">
                  Password
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col s6">
            <button type="button" className="btn waves-effect waves-green">
              Cancel
            </button>
          </div>
          <div className="col s6">
            <button
              type="button"
              className="btn waves-effect waves-green"
              onClick={this.loginHandler}
            >
              Login
            </button>
          </div>
        </div>
      </div>);
  }
}


export { LoginPage };
