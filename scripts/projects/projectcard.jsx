// @flow strict
import * as React from 'react';
import type { Project } from '../core/types';
import { apis } from '../core/api';
import { DeleteProjectModal } from './projectcarddeletemodal';

const empty = '#';

type ProjectCardProps =
  {|
   isSelected: boolean,
   project: Project,
   updateSessionByProject: (number) => void,
   updateProjectList: () => void,
|};

type ProjectCardState =
  {|
   deleteModalOpen: boolean,
   |};

const defaultProjectCardState: ProjectCardState = {
  deleteModalOpen: false,
};


class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
  state = defaultProjectCardState

  selectHandler = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const { updateSessionByProject, project } = this.props;
    updateSessionByProject(project.id);
  }

  deleteHandler = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ deleteModalOpen: true });
  }

  deleteProject = () => {
    // XXX do not delete default or selected project.
    const { updateProjectList, project } = this.props;
    apis.accounts.projectDelete(project.id)
      .then(updateProjectList)
      .catch((ex) => { console.log('ex', ex); debugger; });
  }

  cancelDelete = () => {
    this.setState({ deleteModalOpen: false });
  }

  render() {
    const { isSelected, project } = this.props;
    const { deleteModalOpen } = this.state;
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
            <a href={empty} onClick={this.deleteHandler}>
              Delete
            </a>
            { deleteModalOpen
           && (
             <DeleteProjectModal
               project={project}
               onDeleteHandler={this.deleteProject}
               onCancelHandler={this.cancelDelete}
             />)}
          </div>
        </div>
      </div>);
  }
}

export { ProjectCard };
