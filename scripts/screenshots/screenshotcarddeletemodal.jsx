// @flow strict

import * as React from 'react';

import { Modal } from '../core/components/modal';

// import type { Screenshot } from '../core/types';

// TODO add screenshot type.
type DeleteScreenshotModalProps =
  {|
   screenshot: *,
   onDeleteHandler: () => void,
   onCancelHandler: () => void,
   |};

const DeleteScreenshotModal = (
  {
    screenshot,
    onDeleteHandler,
    onCancelHandler,
  }: DeleteScreenshotModalProps,
) => (
  <Modal>
    <div className="modal-content">
      <h4>Delete Project</h4>
      <p>Are you sure you want to permanently delete project { screenshot.id }?</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="waves-effect btn-flat" onClick={onCancelHandler}>Cancel</a>
      <a href="#!" className="waves-effect btn-flat" onClick={onDeleteHandler}>Delete</a>
    </div>
  </Modal>);

export { DeleteScreenshotModal };
