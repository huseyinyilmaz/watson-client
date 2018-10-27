// @flow
import * as React from 'react';
import type { Project } from '../core/types';

const empty = '#';

type ProjectCardProps = {|
  isSelected: boolean,
  project: Project,
|};

class ProjectCard extends React.Component<ProjectCardProps> {
  selectHandler = () => {
    console.log('OK');
  }

  render() {
    const { isSelected, project } = this.props;
    let selectedCss;
    if (isSelected) {
      selectedCss = 'card small project-card selected';
    } else {
      selectedCss = 'card small project-card';
    }

    return (
      <div className="col s12 m6 l4" key={project.id}>
        <div className={selectedCss}>
          <div className="card-content">
            <span className="card-title">
              { project.name }
            </span>
            <table className="striped responsive-table organization-table">
              <tbody>
                <tr>
                  <th>id</th>
                  <td>{ project.id }</td>
                </tr>
                <tr>
                  <th>name</th>
                  <td>{ project.name }</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-action">
            <a href={empty} onClick={this.selectHandler}>
              Select
            </a>
            <a href={empty}>
              This is a link
            </a>
          </div>
        </div>
      </div>);
  }
}

export { ProjectCard };
