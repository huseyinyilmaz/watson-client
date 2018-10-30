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

const getProjectPath = (session: Session): string => {
  const { organization, project } = session;
  return `/o/${organization.slug}/p/${project.slug}`;
};


const getProjectsPath = (session: Session) => {
  const { organization } = session;
  return `/o/${organization.slug}/projects`;
};

const getNewProjectPath = (session: Session): string => {
  const { organization } = session;
  return `/o/${organization.slug}/projects/new`;
};

export {
  getOrganizationsPath,
  getOrganizationPath,
  getProjectsPath,
  getProjectPath,
  getNewProjectPath,
};
