// @flow
import * as React from 'react';
import { parse } from 'date-fns';

import { apis } from './api';

// import type { Apis } from './api';
import { tokenStore } from './store';

type AppProviderProps = {
  children: React.Element<any>,
};

export type AppStatus = 'initializing' | 'initialized';

type User = {
  id: number,
  defaultOrganization: number,
  currentOrganization: number,
  email: string,
  emailVerified: boolean,
  fullName: string,
  dateJoined: Date,
}

type Organization = {
  id: number,
  company: string,
  location: string,
  name: string,
  slug: string,
  url: string,
}

type AppProviderState = {
  user?: User,
  organizations: Array<Organization>,
  status: AppStatus,
  constants: any,
  initialization: {
    context: boolean,
    constants: boolean,
  },
  constants: any,
};

const anonUser = undefined;

const defaultAppProviderState: AppProviderState = {
  user: anonUser,
  organizations: [],
  status: 'initializing',
  initialization: {
    context: false,
    constants: false,
  },
  constants: {},
};

const AppContext = React.createContext(
  {
    state: defaultAppProviderState,
    actions: {
      openLoginDialog: () => undefined,
      setToken: () => undefined,
      removeToken: () => undefined,
    },
  },
);

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

  setUser(user: any) {
    this.setState({ user });
  }

  setOrganizations(organizations: Array<any>) {
    this.setState({ organizations });
  }

  getToken = tokenStore.get

  setToken = (sessionToken: string) => {
    tokenStore.set(sessionToken);
    this.updateSession();
  }

  setContextInitialized = () => {
    this.setState(prevState => ({
      ...prevState,
      initialization: {
        ...prevState.initialization,
        context: true,
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
      if (prevState.initialization.constants && prevState.initialization.context) {
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

  updateSession = () => {
    const sessionToken = tokenStore.get();
    if (sessionToken) {
      // get session info
      apis.accounts.sessionGet().then(
        (session) => {
          if (session.logged_in) {
            const { organizations, user: usr } = session;

            const user = {
              id: usr.id,
              defaultOrganization: usr.defaultOrganization,
              currentOrganization: usr.defaultOrganization,
              email: usr.email,
              emailVerified: usr.email_verified,
              fullName: usr.full_name,
              dateJoined: parse(usr.date_joined),
            };
            this.setState({ user, organizations });
            this.setContextInitialized();
          }
        },
      ).catch(
        (e) => {
          console.log('Error', e);
          if (e.response.status === 403) {
            console.log('Token is invalid delete the token');
            this.removeToken();
          }
          this.setContextInitialized();
        },
      );
    } else {
      this.setState({ user: anonUser });
      this.setContextInitialized();
    }
  }

  render() {
    console.log(this.state);
    const context = {
      state: this.state,
      actions: {
        setUser: this.setUser,
        setOrganizations: this.setOrganizations,
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
