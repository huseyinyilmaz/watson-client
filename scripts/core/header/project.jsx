// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { getProjectsPath } from '../urlutils';

type ProjectButtonProps = {};

class ProjectButton extends React.Component<ProjectButtonProps> {
  state = undefined

  render() {
    return (
      <AppContext.Consumer>
        {
          (context) => {
            const { session } = context.state;
            if (session) {
              const { project } = session;
              const fullPath = getProjectsPath(session);
              return (
                <Link to={fullPath}>
                  <span className="project-button btn">
                    Project:
                    { project.name }
                  </span>
                </Link>);
            } else {
              return null;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { ProjectButton };
