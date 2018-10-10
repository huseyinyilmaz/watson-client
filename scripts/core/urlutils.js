// @flow
import type { Session } from './types';

const buildPath = (session: Session, postfix: string) => {
  if (session) {
    const { organization, project } = session;
    return `/${organization.slug}/${project.slug}${postfix}`;
  } else {
    return undefined;
  }
};

export { buildPath };
