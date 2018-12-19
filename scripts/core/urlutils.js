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

const getNewOrganizationPath = () => '/organizations/new';

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

const getScreenshotsPath = (session: Session) => {
  const {
    organization,
    project,
  } = session;
  return `/${organization.slug}/${project.slug}/screenshots`;
};

const getNewScreenshotPath = (session: Session) => {
  const {
    organization,
    project,
  } = session;
  return `/${organization.slug}/${project.slug}/screenshots/new`;
};

const getScreenshotDetailPath = (session: Session, screenshotSnapshotId: number) => {
  const {
    organization,
    project,
  } = session;
  return `/${organization.slug}/${project.slug}/screenshots/detail/${screenshotSnapshotId}`;
};

export {
  getOrganizationsPath,
  getOrganizationPath,
  getNewOrganizationPath,
  getProjectsPath,
  getProjectPath,
  getNewProjectPath,
  getScreenshotsPath,
  getNewScreenshotPath,
  getScreenshotDetailPath,
};
