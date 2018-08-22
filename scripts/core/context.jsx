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

};

const anonUser = undefined;

const defaultAppProviderState: AppProviderState = {
  user: anonUser,
  organizations: [],
  status: 'initializing',
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
  constructor(props: AppProviderProps) {
    super(props);
    this.state.status = 'initialized';
  }


  state = defaultAppProviderState;

  componentDidMount = () => {
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
          }
        },
      ).catch(
        (e) => {
          console.log('Error', e);
          if (e.response.status === 403) {
            console.log('Token is invalid delete the token');
            this.removeToken();
          }
        },
      );
    } else {
      this.setState({ user: undefined });
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
