// @flow

import * as React from 'react';

import '../../styles/projects.scss';

import { Link } from 'react-router-dom';

import { AppContext } from '../core/context';

import { apis } from '../core/api';
import { getNewProjectPath } from '../core/urlutils';
import { ProjectCard } from './projectcard';

type ProjectsPageProps = { organization: number };
type ProjectsPageState = { projects: any };

const defaultProjectsPageState = {
  projects: undefined,
};

class ProjectsPageInternal extends React.Component<ProjectsPageProps, ProjectsPageState> {
  state = defaultProjectsPageState

  componentDidMount = () => {
    const { organization } = this.props;
    apis.accounts.projectsGet(organization).then((data) => {
      this.setState({ projects: data });
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            const { updateSession } = context.actions;
            const { projects } = this.state;
            let projectDivs = [];
            if (session && projects) {
              const { project } = session;
              const fullPath = getNewProjectPath(session);
              projectDivs = projects.map((p) => {
                const isSelected = (project.id === p.id);
                return (
                  <ProjectCard
                    updateSession={updateSession}
                    isSelected={isSelected}
                    project={p}
                    key={p.id}
                  />);
              });

              return (
                <div className="container projects-container">
                  <div className="section">
                    <div className="row">
                      <div className="col s12">
                        Projects:
                      </div>
                    </div>
                    <div className="row">
                      { projectDivs }
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <Link to={fullPath}>
                          Create a new project
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>);
            } else {
              // There is no project or there is no session.
              return undefined;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

const ProjectsPage = () => (

  <AppContext.Consumer>
    {
      (context) => {
        const { state: { session } } = context;
        let currentOrganization;
        if (session) {
          const { organization } = session;
          currentOrganization = organization.id;
        } else {
          currentOrganization = -1;
        }
        return (<ProjectsPageInternal organization={currentOrganization} />);
      }
    }
  </AppContext.Consumer>);

export { ProjectsPage };
