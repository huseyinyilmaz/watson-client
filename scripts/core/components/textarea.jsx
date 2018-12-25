// @flow strict

import * as React from 'react';

declare var M: any;

type EventHandler = (e: SyntheticEvent<HTMLInputElement>) => void;

type TextAreaProps =
  {|
    id: string,
    display: string,
    value: string,
    onChange: EventHandler,
    onBlur: EventHandler,
    error: ?string,
    touched: boolean,
   |};


class TextArea extends React.Component<TextAreaProps> {
  constructor(props: TextAreaProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    M.textareaAutoResize(this.ref.current);
  }

  ref: any

  render() {
    const {
      id,
      display,
      value,
      onChange,
      onBlur,
      error,
      touched,
    } = this.props;

    const el = (
      <div>
        <label htmlFor={id}>{display}</label>
        <textarea
          ref={this.ref}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && touched && <span className="helper-text error">{error}</span>}
      </div>);
    return el;
  }
}

export { TextArea };
