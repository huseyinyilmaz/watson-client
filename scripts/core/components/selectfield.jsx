// @flow strict

import * as React from 'react';

type EventHandler = (e: SyntheticEvent<HTMLInputElement>) => void;

export type SelectOption = {| key: string, value: string, display: string|}
type SelectFieldProps =
  {|
    id: string,
    value: string,
    options: Array<SelectOption>,
    onChange: EventHandler,
    onBlur: EventHandler,
    error: ?string,
    touched: boolean,
   |};

const SelectField = ({
  id, value, options, onChange, onBlur, error, touched,
}: SelectFieldProps) => (
  <div className="input-field">
    <select
      id={id}
      className={`browser-default validate ${(touched && (error ? 'invalid' : 'valid')) || ''}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="" key="default" disabled>
        Choose choose a device
      </option>
      {options.map(d => <option value={d.value} key={d.key}>{d.display}</option>)}
    </select>
    {error && touched && <span className="helper-text error" data-error={error} />}
  </div>);

export { SelectField };
