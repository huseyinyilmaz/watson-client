// @flow
import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { apis } from './api';
import { AppContext } from './context';
import { PreLoader } from './loading';

type ProjectSelectorProps = {};
type ProjectDropdownTriggerProps = {}

declare var M: any;

class ProjectDropdownTrigger extends React.Component<ProjectDropdownTriggerProps> {

  constructor(props: ProjectDropdownTriggerProps) {
    super(props);
    this.dropdownRef = React.createRef();
  }

  componendDidMount = () => {
    this.dropdown = new M.Dropdown(this.dropdownRef.current, {});
  }

  dropdownRef: any

  dropdown: any

  render() {
    return (
      <a
        className="dropdown-trigger"
        href="#!"
        data-target="project_dropdown"
        ref={this.dropdownRef}
      >
        Dropdown
      </a>
    );
  }
}

class ProjectSelectorInternal extends React.Component<ProjectSelectorProps> {
  state = undefined

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  componentDidMount() {
    console.log('Call component did mount');
    M.updateTextFields();
    const options = {};
    this.selectInstance = M.FormSelect.init(this.selectRef.current, options);
  }

  selectRef: any

  selectInstance: any

  render() {
    return (
      <div className="input-field col s12">
        <select id="project_select" ref={this.selectRef}>
          <option value="" disabled selected>Choose your option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <label htmlFor="project_select">Materialize Select</label>
      </div>
    );
  }
}

const ProjectSelector = () => (
  <AppContext.Consumer>
    {
      (context) => {
        if (context.state.status === 'initializing') {
          return <PreLoader />;
        } else {
          return (
            <ProjectSelectorInternal />
          );
        }
      }
    }
  </AppContext.Consumer>
);

export { ProjectSelector, ProjectDropdownTrigger };
