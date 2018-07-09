// @flow
import * as React from 'react';


type AppProviderProps = {
  children: React.Element<any>,
};

type AppProviderState = {
  user: any,
};

const defaultAppProviderState: AppProviderState = {
  user: undefined,
};

const AppContext = React.createContext({ state: defaultAppProviderState });

class AppProvider extends React.Component<AppProviderProps, AppProviderState> {
  state = defaultAppProviderState;

  setUser(user: any) {
    this.setState({ user });
  }

  render() {
    console.log(this.state);
    const context = {
      state: this.state,
      actions: {
        setUser: this.setUser,
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
