// @flow
import * as React from 'react';

type LoginProviderProps = {
  children: React.Element<any>,
};

type LoginProviderState = {
  visible: boolean,
  username: '',
  password: '',
};

const defaultLoginProviderState: LoginProviderState = {
  visible: false,
  username: '',
  password: '',
};

const LoginContext = React.createContext(
  {
    state: defaultLoginProviderState,
  },
);

class LoginProvider extends React.Component<LoginProviderProps, LoginProviderState> {
  state = defaultLoginProviderState;

  render() {
    console.log(this.state);
    const context = {
      state: this.state,
      actions: {
      },
    };
    const { children } = this.props;
    return (
      <LoginContext.Provider value={context}>
        { children }
      </LoginContext.Provider>);
  }
}


export {
  LoginContext,
  LoginProvider,
};
