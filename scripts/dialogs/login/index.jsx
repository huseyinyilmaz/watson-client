// @flow
import * as React from 'react';
import { Modal } from 'materialize-css/dist/js/materialize';

type LoginDialogState = {}

class LoginDialog extends React.Component<LoginDialogState> {
  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    console.log('Modal = ', Modal);
    this.modal = Modal.init(this.ref.current);
    this.modal.open();
  }

  componentWillUnmount() {
    if (this.modal.isOpen()) {
      this.modal.close();
    }
    this.modal.destroy();
  }

  ref: any

  modal: any

  render() {
    return (
      <div className="modal" ref={this.ref}>
        <div className="modal-content">
          <h4>
            Modal Header
          </h4>
          <p>
            A bunch of text
          </p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">
            Agree
          </a>
        </div>
      </div>);
  }
}


export { LoginDialog };
