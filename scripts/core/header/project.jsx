import * as React from 'react';
import { Link } from 'react-router-dom';

class ProjectButton extends React.Component<HeaderProps> {
  state = {}

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
