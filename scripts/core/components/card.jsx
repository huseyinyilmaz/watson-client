// @flow strict
import * as React from 'react';

// declare var M: any;

type CardProps = {
  children: any,
};

const Card = ({ children }: CardProps) => (
  <div className="modal">
    {children}
  </div>);

export { Card };
