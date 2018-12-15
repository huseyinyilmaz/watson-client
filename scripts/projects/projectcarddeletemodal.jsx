// @flow strict

import * as React from 'react';

import { Modal } from '../core/components/modal';

import type { Project } from '../core/types';

type DeleteProjectModalProps =
  {|
   project: Project,
   onDeleteHandler: () => void,
   onCancelHandler: () => void,
   |};

const DeleteProjectModal = (
  {
    project,
    onDeleteHandler,
    onCancelHandler,
  }: DeleteProjectModalProps,
) => (
  <Modal>
    <div className="modal-content">
      <h4>Delete Project</h4>
      <p>Are you sure you want to permanently delete project { project.name }?</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="waves-effect btn-flat" onClick={onCancelHandler}>Cancel</a>
      <a href="#!" className="waves-effect btn-flat" onClick={onDeleteHandler}>Delete</a>
    </div>
  </Modal>);

export { DeleteProjectModal };
