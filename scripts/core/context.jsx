// @flow strict
import * as React from 'react';

import { sessionStore } from './store';
import { apis } from './api';


import type {
  Session,
  ClientSession,
} from './types';

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
    setClientSession: (ClientSession) => void,
    removeClientSession: () => void,
    // buildUrl: string => string,
    updateSession: () => void,
    updateSessionByProject: (number) => void,
    updateSessionByOrganization: (number) => void,
  },
}

const defaultAppProviderContext: AppProviderContext = {
  state: defaultAppProviderState,
  actions: {
    setClientSession: _ => undefined,
    removeClientSession: () => undefined,
    // buildUrl: string => string,
    updateSession: () => undefined,
    updateSessionByProject: (_: number) => undefined,
    updateSessionByOrganization: (_: number) => undefined,
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

  getClientSession = sessionStore.get

  setClientSession = (session: ClientSession) => {
    sessionStore.set(session);
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

  removeClientSession = () => {
    sessionStore.remove();
    this.updateSession();
  }

  processSession = (session: Session) => {
    this.setState({ session });
    sessionStore.set({
      token: session.key,
      organizationId: session.organization.id,
      projectId: session.project.id,
      userId: session.user.id,
    });
  }

  handleProcessSessionError = (e: *) => {
    console.log('Error', e);
    if (e.response.status === 403) {
      console.log('Token is invalid delete the token');
      this.removeClientSession();
    }
  }

  updateSessionByProject = (projectId: number) => {
    const clientSession = this.getClientSession();
    if (clientSession) {
      apis.accounts.sessionGetByProject(projectId)
        .then(this.processSession)
        .catch(this.handleProcessSessionError);
    } else {
      this.setState({ session: undefined });
    }
    this.setSessionInitialized();
  }

  updateSessionByOrganization = (organizationId: number) => {
    const clientSession = this.getClientSession();
    if (clientSession) {
      apis.accounts.sessionGetByOrganization(organizationId)
        .then(this.processSession)
        .catch(this.handleProcessSessionError);
    } else {
      this.setState({ session: undefined });
    }
    this.setSessionInitialized();
  }

  updateSession = () => {
    const clientSession = this.getClientSession();
    if (clientSession) {
      apis.accounts.sessionGet().then(this.processSession).catch(this.handleProcessSessionError);
    } else {
      this.setState({ session: undefined });
    }
    this.setSessionInitialized();
  }

  render() {
    console.log(this.state);
    const context = {
      state: this.state,
      actions: {
        updateSession: this.updateSession,
        updateSessionByProject: this.updateSessionByProject,
        updateSessionByOrganization: this.updateSessionByOrganization,
        setClientSession: this.setClientSession,
        removeClientSession: this.removeClientSession,
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
