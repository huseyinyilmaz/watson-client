import * as React from 'react';
import { Link } from 'react-router-dom';

class OrganizationButton extends React.Component<HeaderProps> {
  state = {}

  render() {
    return (
      <span className="organization-button btn">
        Organization:
        <Link to="/organizations">
          Organizations
        </Link>
      </span>);
  }
}

export { OrganizationButton };
