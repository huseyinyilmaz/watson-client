// @flow

import * as React from 'react';


type AppProviderProps = {
  children: React.Element<any>,
};

type AppProviderState = {
  user: any,
  loginVisible: boolean,
};

const defaultAppProviderState: AppProviderState = {
  user: undefined,
  loginVisible: false,
};

const AppContext = React.createContext(
  {
    state: defaultAppProviderState,
    actions: { openLoginDialog: () => undefined },
  },
);

class AppProvider extends React.Component<AppProviderProps, AppProviderState> {
  state = defaultAppProviderState;

  setUser(user: any) {
    this.setState({ user });
  }

  setLoginVisible(loginVisible: boolean) {
    this.setState({ loginVisible });
  }

  openLoginDialog = () => {
    this.setLoginVisible(true);
  }

  closeLoginDialog() {
    this.setLoginVisible(true);
  }

  render() {
    console.log(this.state);
    const context = {
      state: this.state,
      actions: {
        setUser: this.setUser,
        setLoginVisible: this.setLoginVisible,
        openLoginDialog: this.openLoginDialog,
        closeLoginDialog: this.closeLoginDialog,
      },
    };
    const { children } = this.props;
    return (
      <AppContext.Provider value={context}>
        { children }
      </AppContext.Provider>);
  }
}


export {
  AppContext,
  AppProvider,
};
