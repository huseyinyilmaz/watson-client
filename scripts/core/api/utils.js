// @flow strict

import { parse } from 'date-fns';

import type {
  APIUser,
  User,
  APISession,
  Session,
} from '../types';

const normalizeAPIUser = (apiUser: APIUser): User => {
  const {
    id,
    default_organization: defaultOrganization,
    email,
    email_verified: emailVerified,
    full_name: fullName,
    date_joined: dateJoinedStr,
  } = apiUser;
  return {
    id,
    defaultOrganization,
    email,
    emailVerified,
    fullName,
    dateJoined: parse(dateJoinedStr),
  };
};

const normalizeAPISession = (apiSession: APISession): Session => {
  const {
    key,
    user: apiUser,
    organization,
    project,
  } = apiSession;

  return {
    key,
    user: normalizeAPIUser(apiUser),
    organization,
    project,
  };
};

export {
  normalizeAPIUser,
  normalizeAPISession,
};
