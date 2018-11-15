// @flow
import * as React from 'react';
// import * as queryString from 'query-string';

import { apis } from './api';

// import type { Apis } from './api';
import { tokenStore } from './store';

import type { Session } from './types';

type AppProviderProps = {
  children: React.Element<any>,
};

export type AppStatus = 'initializing' | 'initialized';

type AppProviderState = {
  session?: Session,
  status: AppStatus,
  constants: any,
  initialization: {
    session: boolean,
    constants: boolean,
  },
};

const defaultAppProviderState: AppProviderState = {
  session: undefined,
  constants: {},
  status: 'initializing',
  initialization: {
    session: false,
    constants: false,
  },
};

type AppProviderContext = {
  state: AppProviderState,
  actions: {
    setToken: (string) => void,
    removeToken: () => void,
    // buildUrl: string => string,
    updateSession: () => void,
  },
}

const defaultAppProviderContext: AppProviderContext = {
  state: defaultAppProviderState,
  actions: {
    setToken: _ => undefined,
    removeToken: () => undefined,
    // buildUrl: string => string,
    updateSession: () => undefined,
  },
};

const AppContext = React.createContext<AppProviderContext>(defaultAppProviderContext);

class AppProvider extends React.Component<AppProviderProps, AppProviderState> {
  // constructor(props: AppProviderProps) {
  //   super(props);
  //   this.state.status = 'initialized';
  // }


  state = defaultAppProviderState;

  componentDidMount = () => {
    this.initializeConstants();
    this.updateSession();
  }

  getToken = tokenStore.get

  setToken = (sessionToken: string) => {
    tokenStore.set(sessionToken);
    this.updateSession();
  }

  setSessionInitialized = () => {
    this.setState(prevState => ({
      ...prevState,
      initialization: {
        ...prevState.initialization,
        session: true,
      },
    }));
    this.updateStatus();
  }

  setConstantsInitialized = () => {
    this.setState(prevState => ({
      ...prevState,
      initialization: {
        ...prevState.initialization,
        constants: true,
      },
    }));
    this.updateStatus();
  }

  initializeConstants = () => {
    apis.core.constantsGet().then(
      (constants) => {
        this.setState({ constants });
        this.setConstantsInitialized();
      },
    );
    return undefined;
  }

  updateStatus = () => {
    this.setState((prevState) => {
      if (prevState.initialization.constants && prevState.initialization.session) {
        return {
          ...prevState,
          status: 'initialized',
        };
      } else {
        return prevState;
      }
    });
  }

  removeToken = () => {
    tokenStore.remove();
    this.updateSession();
  }

  updateSession = (projectId: ?number) => {
    const sessionToken = tokenStore.get();
    if (sessionToken) {
      // const { o, p } = queryString.parse(window.location.search);
      // get session info
      apis.accounts.sessionGet(projectId).then(
        (session) => {
          if (session.loggedIn) {
            this.setState({ session });
            this.setSessionInitialized();
          }
        },
      ).catch(
        (e) => {
          console.log('Error', e);
          if (e.response.status === 403) {
            console.log('Token is invalid delete the token');
            this.removeToken();
          }
          this.setSessionInitialized();
        },
      );
    } else {
      this.setState({ session: undefined });
      this.setSessionInitialized();
    }
  }

  render() {
    console.log(this.state);
    const context = {
      state: this.state,
      actions: {
        updateSession: this.updateSession,
        setToken: this.setToken,
        removeToken: this.removeToken,
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
