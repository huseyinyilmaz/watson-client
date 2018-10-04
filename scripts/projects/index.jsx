// @flow

import * as React from 'react';

import '../../styles/screenshots.scss';

import { Link } from 'react-router-dom';

import { AppContext } from '../core/context';

import { apis } from '../core/api';


type ProjectsPageProps = { organization: number };
type ProjectsPageState = { projects: any };


const Image = ({ project }: {project: any}) => {
  console.log('project: ', project);
  const link = `/projects/detail/${project.id}`;
  return (
    <div className="col s12 m4 l3" key={project.id}>
      <div className="card small">
        <div className="card-image">
          <img src={project.image} alt={project.name} />
        </div>
        <div className="card-content">
          <p>
            {project.address}
          </p>
        </div>
        <div className="card-action">
          <Link to={link}>Details</Link>
        </div>
      </div>
    </div>
  );
};

const defaultProjectsPageState = {
  projects: undefined,
};

class ProjectsPageInternal extends React.Component<ProjectsPageProps, ProjectsPageState> {
  state = defaultProjectsPageState

  componentDidMount = () => {
    const { organization } = this.props;
    apis.screenshots.projectsGet(organization).then((data) => {
      this.setState({ projects: data });
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            console.log(context);
            const { projects } = this.state;
            let projectDivs = [];
            if (projects) {
              projectDivs = projects.map(s => (
                <Image project={s} />
              ));
            }
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
                      <Link to="/projects/new">
                        Create a new project
                      </Link>
                    </div>
                  </div>

                </div>
              </div>);
          }
        }
      </AppContext.Consumer>);
  }
}

const ProjectsPage = () => (
  <AppContext.Consumer>
    {
      (context) => {
        const { state: { user } } = context;
        let currentOrganization;
        if (user) {
          currentOrganization = user.currentOrganization; // eslint-disable-line prefer-destructuring, max-len
        } else {
          currentOrganization = -1;
        }
        return (<ProjectsPageInternal organization={currentOrganization} />);
      }
    }
  </AppContext.Consumer>);

export { ProjectsPage };
