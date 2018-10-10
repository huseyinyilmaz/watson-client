// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';
import { buildPath } from '../urlutils';

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
              const fullPath = buildPath(session, '/projects');

              return (
                <span className="project-button btn">
                  Project:
                  <Link to={fullPath}>
                    { project.name }
                  </Link>
                </span>);
            } else {
              return null;
            }
          }
        }
      </AppContext.Consumer>);
  }
}

export { ProjectButton };
