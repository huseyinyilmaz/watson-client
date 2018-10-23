// @flow

import * as React from 'react';

import '../../styles/screenshots.scss';

import { Link } from 'react-router-dom';

import { AppContext } from '../core/context';

import { apis } from '../core/api';
import { getNewProjectsPath } from '../core/urlutils';

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
            const { projects } = this.state;

            const empty = '#';
            let projectDivs = [];
            if (session && projects) {
              const fullPath = getNewProjectsPath(session);

              projectDivs = projects.map(p => (
                <div className="col s12 m6 l4">
                  <div className="card small organization-card" key={p.id}>
                    <div className="card-content">
                      <span className="card-title">
                        {p.name}
                      </span>
                      <table className="striped responsive-table organization-table">
                        <tbody>
                          <tr>
                            <th>id</th>
                            <td>{ p.id }</td>
                          </tr>
                          <tr>
                            <th>name</th>
                            <td>{ p.name }</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="card-action">
                      <a href={empty}>
                        This is a link
                      </a>
                      <a href={empty}>
                        This is a link
                      </a>
                    </div>
                  </div>
                </div>
              ));

              return (
                <div className="container">
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
