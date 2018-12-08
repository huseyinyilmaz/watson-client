// @flow
// Inspired from this: https://github.com/react-materialize/react-materialize/blob/master/src/Modal.js
import * as React from 'react';

declare var M: any;

type ModalProps = {
  children: any,
};

type ModalState = null;

/*
  import { Modal } from '../core/components/modal';


  <Modal>
    <div className="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </Modal>
*/
class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.instance = M.Modal.init(this.modalRef.current, {});
    this.instance.open();
  }

  componentWillUnmount() {
    this.instance.close();
    this.instance.destroy();
  }

  modalRef: any

  instance: any

  render() {
    const { children } = this.props;
    return (
      <div className="modal" ref={this.modalRef}>
        {children}
      </div>);
  }
}

export { Modal };
