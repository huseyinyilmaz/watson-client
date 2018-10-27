// @flow
/*
 * Url paths.
 * landingpage:         /
 * dashboard:           /o/<organization name>
 * organizations:       /organizations
 * projects:            /o/<organization name>/projects
 * project detail page: /o/<organization name>/p/<project name>
 * diff:                /diff
 */
import type { Session } from './types';


const getOrganizationsPath = () => '/organizations';

const getOrganizationPath = (session: Session) => {
  if (session) {
    const { organization } = session;
    return `/o/${organization.slug}`;
  } else {
    return undefined;
  }
};


const getProjectsPath = (session: Session) => {
  if (session) {
    const { organization } = session;
    return `/o/${organization.slug}/projects`;
  } else {
    return undefined;
  }
};

const getNewProjectsPath = (session: Session) => {
  if (session) {
    const { organization } = session;
    return `/o/${organization.slug}/projects/new`;
  } else {
    return undefined;
  }
};

export {
  getOrganizationsPath,
  getOrganizationPath,
  getProjectsPath,
  getNewProjectsPath,
};
