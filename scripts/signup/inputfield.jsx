// @flow strict

import * as React from 'react';

type EventHandler = (e: SyntheticEvent<HTMLInputElement>) => void;

type InputProps =
  {|
    id: string,
    type: string,
    display: string,
    value: string,
    onChange: EventHandler,
    onBlur: EventHandler,
    error: ?string,
    touched: boolean,
   |};

const InputField = ({
  id, type, display, value, onChange, onBlur, error, touched,
}: InputProps) => (
  <div className="input-field">
    <input
      id={id}
      type={type}
      className={touched && (error ? 'validate invalid' : 'validate valid')}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    <label htmlFor={id}>{display}</label>
    {error && touched && <span className="helper-text error" data-error={error} />}
  </div>);

export { InputField };
