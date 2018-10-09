// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

type ProjectButtonProps = {};

class ProjectButton extends React.Component<ProjectButtonProps> {
  state = undefined

  render() {
    return (
      <span className="project-button btn">
        Project:
        <Link to="/projects">
          Projects
        </Link>
      </span>);
  }
}

export { ProjectButton };
